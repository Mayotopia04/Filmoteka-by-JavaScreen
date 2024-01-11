import Handlebars from 'handlebars';

class RenderHeader {
    render(options) {
        console.log('start header rendering');
        const templateHtml = `
        <div class="col mb-3">
        
        <div class="row border p-4">
            <div class="col text-start">logo goes here</div>
            <div class="col text-end">Home, Library</div>
        </div> 
        <div class="row border p-4">
            <div class="col text-center">
            Search goes here
            </div>
        </div>
    </div>`;

        Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
            return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
        });
        const template = Handlebars.compile(templateHtml);
        document.getElementById('top-header').innerHTML = template(options);
    }
}

export default new RenderHeader();