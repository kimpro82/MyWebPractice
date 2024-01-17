var linksData = [
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
document.addEventListener('DOMContentLoaded', function () {
    var linksContainer = document.getElementById('linksContainer');
    if (linksContainer) {
        linksData.forEach(function (link) {
            var linkItem = document.createElement('div');
            linkItem.classList.add('link-item');
            var linkAnchor = document.createElement('a');
            linkAnchor.href = link.url;
            linkAnchor.textContent = link.title;
            linkItem.appendChild(linkAnchor);
            linksContainer.appendChild(linkItem);
        });
    }
});
