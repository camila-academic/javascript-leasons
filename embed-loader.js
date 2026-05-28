async function loadWikipedia(url, elementId) {
    try {
        const title = decodeURIComponent(
            url.split("/wiki/")[1]
        );

        const api = new URL(url).origin +
            "/api/rest_v1/page/summary/" + title;

        const response = await fetch(api);
        const data = await response.json();

        let content = data.extract;

        document.getElementById(elementId).innerHTML = `
            <div class="card">
                ${
                    data.thumbnail
                    ? `<img src="${data.thumbnail.source}" width="120">`
                    : ""
                }

                <div>
                    <h3>${data.title}</h3>
                    <div>
                        <p>${content}</p>
                        <a href="${data.content_urls.desktop.page}" target="_blank">Ler mais</a>
                    </div>
                <div>
            </div>
        `;
    } catch (err) {
        console.error(err);
    }
}

async function loadPreview(url, elementId) {
    const api = `https://api.microlink.io/?url=${encodeURIComponent(url)}`;

    const response = await fetch(api);
    const result = await response.json();

    const data = result.data;
    console.log(data);

    let content = data.description;

    document.getElementById(elementId).innerHTML = `
        <div class="card">
            ${
                data.image.url
                ? `<img src="${data.image.url}">`
                : ""
            }

            <div>
                <h3>${data.title}</h3>
                <div>
                    <p>${content}</p>
                    <a href="${data.url}" target="_blank">Ler mais</a>
                </div>
            <div>
        </div>
    `;
}
