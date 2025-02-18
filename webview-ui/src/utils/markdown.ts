export const removeTargetBlank = (
  children: React.ReactNode & React.ReactNode[],
) => {
  if (!children) return children;
  return children.map((child, key) => {
    if (`${child}`.includes('{:target="_blank"}')) {
      return `${child}`.replace('{:target="_blank"}', '');
    }
    return child;
  });
};

export const removeBrTag = (children: React.ReactNode & React.ReactNode[]) => {
  if (!children) return children;
  return children.map((child, key) => {
    if (`${child}`.includes('<br/>')) {
      return `${child}`.replace('<br/>', '');
    }
    return child;
  });
};

export const removeAdmonitionsSpeChar = (
  children: React.ReactNode & React.ReactNode[],
  type: string,
  title: string,
) => {
  if (!children) return children;
  return children.map((child) => {
    if (title) {
      if (child?.toString().includes('!!! ' + type + ' ' + title)) {
        return child?.toString().replace('!!! ' + type + ' ' + title, '');
      } else if (child?.toString().includes('??? ' + type + ' ' + title)) {
        return child?.toString().replace('??? ' + type + ' ' + title, '');
      }
    } else {
      if (child?.toString().includes('!!! ')) {
        return child?.toString().replace('!!! ' + type, '');
      } else if (child?.toString().includes('??? ')) {
        return child?.toString().replace('??? ' + type, '');
      }
    }
    return child;
  });
};
