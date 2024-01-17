interface Link {
  title: string;
  url: string;
}

const linksData: Link[] = [
  {
    title: 'Google',
    url: 'https://www.google.com'
  },
  {
    title: 'GitHub',
    url: 'https://www.github.com'
  },
  {
    title: 'OpenAI',
    url: 'https://www.openai.com'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const linksContainer = document.getElementById('linksContainer');

  if (linksContainer) {
    linksData.forEach((link: { title: string, url: string }) => {
      const linkItem = document.createElement('div');
      linkItem.classList.add('link-item');

      const linkAnchor = document.createElement('a');
      linkAnchor.href = link.url;
      linkAnchor.textContent = link.title;

      linkItem.appendChild(linkAnchor);
      linksContainer.appendChild(linkItem);
    });
  }
});
