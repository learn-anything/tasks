import os, pickle, fire, warnings

warnings.filterwarnings("ignore")
from tqdm import tqdm
from sentence_transformers import SentenceTransformer
from utils.markdown import escape_links, get_sections

embedder = SentenceTransformer("BAAI/bge-large-en")


def parse_wiki(input_dir: str, output_dir: str = "./.wikis_pkl"):
    """
    Given an input root directoy of a wiki of markdown, generates a pickle file of embeddings for chunks of documents content
    
    TODO:
    - Consider using filename and generate embeddings for them as well
    
    """
    path = os.walk(input_dir)

    mds = []
    mds_sections = {}
    for root, _, files in path:
        for file in files:
            if file[-3:] == ".md":
                mds.append(root + "/" + file)

    for md in mds:
        with open(md, "r") as fl:
            md_raw = fl.read()
        md_raw = escape_links(md_raw)
        md_parsed = get_sections(md_raw)
        md_parsed_sections = md_parsed.split("\n\n")
        for md_parsed_section in md_parsed_sections:
            mds_sections[md_parsed_section] = md

    corpus_embeddings = embedder.encode(
        list(mds_sections.keys()), convert_to_tensor=True, show_progress_bar=True, 
    )
    user_pkl = {"md_sections": mds_sections, "md_embeddings": corpus_embeddings}
    wiki_name = input_dir.split("/")[1]
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    with open(output_dir + "/" + wiki_name + ".pkl", "wb") as fl:
        pickle.dump(user_pkl, fl)


if __name__ == "__main__":
    fire.Fire(parse_wiki)
