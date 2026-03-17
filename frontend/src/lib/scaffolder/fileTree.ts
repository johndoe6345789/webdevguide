import type { GeneratedFile } from './types';

export interface TreeNode {
  name: string;
  path: string;
  children: TreeNode[];
  isDirectory: boolean;
  language?: string;
}

export function buildFileTree(files: GeneratedFile[]): TreeNode {
  const root: TreeNode = { name: '', path: '', children: [], isDirectory: true };

  for (const file of files) {
    const parts = file.path.split('/');
    let current = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isLast = i === parts.length - 1;

      if (isLast) {
        current.children.push({
          name: part, path: file.path,
          children: [], isDirectory: false,
          language: file.language,
        });
      } else {
        let child = current.children.find(
          (c) => c.name === part && c.isDirectory,
        );
        if (!child) {
          child = {
            name: part,
            path: parts.slice(0, i + 1).join('/'),
            children: [], isDirectory: true,
          };
          current.children.push(child);
        }
        current = child;
      }
    }
  }

  sortTree(root);
  return root;
}

function sortTree(node: TreeNode) {
  node.children.sort((a, b) => {
    if (a.isDirectory && !b.isDirectory) return -1;
    if (!a.isDirectory && b.isDirectory) return 1;
    return a.name.localeCompare(b.name);
  });
  node.children.forEach(sortTree);
}
