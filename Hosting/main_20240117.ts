// 2024.01.17

interface Link {
  title: string;
  url: string;
  comment: string;
}

const linksData: Link[] = [
  {
    title: 'TypeScript : index.html to List Web Pages (2024.01.17)',
    url: '',
    comment: 'This page'
  },
  {
    title: 'TypeScript : Touch Event Practice (2024.01.16)',
    url: '../TypeScript/TouchScreenExample.html',
    comment: ''
  },
  {
    title: 'VBScript : Web Calculator (2023.10.14)',
    url: '../VBScript/VbsCalculator.html',
    comment: 'It requires enabling script execution in Internet Explorer mode'
  },
  {
    title: 'VBScript : Hello World (2023.10.14)',
    url: '../VBScript/VbsHelloWorld.html',
    comment: 'It requires enabling script execution in Internet Explorer mode'
  },
  {
    title: 'CSS : Mouse Cursor Customization 2 (2023.02.06)',
    url: '../CSS/Cursor2.html',
    comment: ''
  },
  {
    title: 'CSS : Mouse Cursor Customization (2023.01.29)',
    url: '../CSS/Cursor.html',
    comment: ''
  },
  {
    title: 'Bootstrap : Magic Stick (2022.01.28)',
    url: '../Bootstrap/BootstrapMagicStick.html',
    comment: ''
  },
  {
    title: 'JavaScript : Dove\'s Step 1 (2022.01.13)',
    url: '../JavaScript/DoveStep.html',
    comment: ''
  },
  {
    title: 'JavaScript : Script Tag\'s Location (2022.01.02)',
    url: '../JavaScript/ScriptWithDefer.html',
    comment: ''
  },
  {
    title: 'JavaScript : Colorful Show (2020.03.04)',
    url: '../JavaScript/ColorfulShow.html',
    comment: ''
  },
  {
    title: 'JavaScript : Ganzi (2017.04.03)',
    url: '../JavaScript/Ganzi.html',
    comment: ''
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
      linkAnchor.target = '_blank';

      linkItem.appendChild(linkAnchor);
      linksContainer.appendChild(linkItem);
    });
  }
});
