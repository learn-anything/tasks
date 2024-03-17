import os, pickle, json, re
import streamlit as st
from streamlit_chat import message
from sentence_transformers import SentenceTransformer, util
from utils.markdown import escape_links, get_sections
from utils.llm import generate_answer

wikis = os.listdir('input_dir')
wikis_pkl = os.listdir('.wikis_pkl')

@st.cache_data
def load_data(embeddings_path: str):
    embeddings_path = ".wikis_pkl/" + embeddings_path
    with open(embeddings_path, "rb") as fl:
        user_data = pickle.load(fl)
    return user_data


@st.cache_data
def load_embedding(model_path: str = "BAAI/bge-large-en"):
    embedder = SentenceTransformer(model_path)
    return embedder

user_data = load_data(wikis_pkl[0])
embedder = load_embedding()

st.session_state.setdefault("recipient", wikis[0])
st.session_state.setdefault("messages", [])


def search_doc(username: str, user_input: str):
    input_embedding = embedder.encode(user_input)
    result = util.semantic_search(input_embedding, user_data["md_embeddings"], top_k=1)
    result_ix = result[0][0]["corpus_id"]
    md_section_res = list(user_data["md_sections"].keys())[result_ix]
    with open(user_data["md_sections"][md_section_res], "r") as fl:
        md_section_content = fl.read()
    md_section_content = escape_links(md_section_content)
    md_parsed = get_sections(md_section_content)
    return user_data["md_sections"][md_section_res], md_parsed


def parse_message(user_input: str):
    st.session_state.messages.append({"role": "user", "content": user_input})


def process_message():
    username = st.session_state.recipient
    chat_logs = st.session_state.messages
    user_input = chat_logs[-1]["content"]
    md_path, md_content = search_doc(username, user_input)
    answer = generate_answer(md_path, md_content, chat_logs)
    st.session_state.messages.append({"role": "agent", "content": answer})


def on_selection_change():
    load_data(st.session_state.recipient + ".pkl")
    st.session_state.messages = []


selected_user = st.selectbox(
    "Who you want to talk to?",
    wikis,
    index=None,
    placeholder="Select user to talk to",
    on_change=on_selection_change,
)

if selected_user:
    st.session_state.recipient = selected_user
    with st.form(
        "chat_input",
    ):
        st.text_input(f"Ask {selected_user}", key="user_input")
        submitted = st.form_submit_button("Submit")
        if submitted:
            st.session_state.messages = []
            parse_message(st.session_state.user_input)
            process_message()

    chat_placeholder = st.empty()
    with chat_placeholder.container():
        for i in range(len(st.session_state.messages)):
            message(
                st.session_state["messages"][i]["content"],
                is_user=st.session_state["messages"][i]["role"] == "user",
                key=f"msg_{i}",
            )
