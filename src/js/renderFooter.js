import Handlebars from 'handlebars';
class RenderFooter {

    render(options) {
        console.log('start footer rendering');
        //  Add logic to render footer
        const templateHtml = '<div class="col">\n' +
            '    <h5>Footer goes here...</h5>\n' +
            '    <a href="https://www.google.com">Google</a>\n' +
            '</div>';
        const template = Handlebars.compile(templateHtml);
        document.getElementById('footer').innerHTML = template({});
    }
}

export default new RenderFooter();