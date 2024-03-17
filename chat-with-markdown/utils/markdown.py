import re


def get_sections(input_md: str, sections: list = [], return_root: bool = True):
    """Get sections from a given markdown file (subtitles based)"""
    sections_md = input_md.split("## ")
    root_section = ""
    if return_root:
        try:
            root_section = sections_md[0].split("# ")[1]
        except:
            root_section = sections_md[0].split("# ")[0]
    output_md = root_section + "\n\n".join(
        [section for section in sections_md if section.split("\n\n")[0] in sections]
    )
    return output_md


def escape_links(md_content: str):
    """Omit links from markdown files"""
    links_re = r"\[(.*?)\]\(.*?\)"
    links_name_re = "\\1"
    result = re.sub(links_re, links_name_re, md_content, 0)
    return result