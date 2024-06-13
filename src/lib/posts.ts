import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";

const rootContentDirectory = path.join(process.cwd(), "src/blog-content/");
const postsDirectory = path.join(rootContentDirectory, "problems");
const solutionsDirectory = path.join(rootContentDirectory, "solutions");

interface PostData {
  slug: string;
  title: string;
  date: string;
  publishedAt: string;
  topics: string[];
  hasSolution: boolean;
  complexity: string;
}

export function getSortedPostsData(): PostData[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.mdx$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    return {
      slug: id,
      ...matterResult.data,
    } as PostData;
  });

  return allPostsData.sort((a, b) => {
    // @ts-ignore
    if (a.title.toLocaleLowerCase() > b.title.toLocaleLowerCase()) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getPostBySlug(slug: string, isSolution = false) {
  const directory = isSolution ? solutionsDirectory : postsDirectory;
  const fullPath = path.join(directory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { frontmatter, content } = await compileMDX({
    source: fileContents,
    options: {
      parseFrontmatter: true,
    },
  });

  return { frontmatter, content };
}
