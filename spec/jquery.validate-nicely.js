describe("The plugin", function () {
    var submitButton;
    beforeEach(function () {
        jasmine.getFixtures().fixturesPath = 'base/spec/fixtures';
        jasmine.getFixtures().load('form.html');
        $("form").validateNicely();
        submitButton = $("#send");
    });

    it("disables submit", function () {
        var initialUrl = window.location.href;
        submitButton.trigger("click");
        expect(window.location.href).toBe(initialUrl);
    });

    it('adds error class if input is empty, otherwise removes it', function () {
        triggerInputError();
        expect($("*[data-required]")).toHaveClass("error");

        triggerInputSuccess();
        expect($("*[data-required]")).not.toHaveClass("error");
    });

    it('can be resetted', function(){
        $("#my-form").validateNicely().destroy();
        triggerInputError();
        expect($("#my-form *[data-required]")).not.toHaveClass("error");

        $("#my-form").validateNicely();
        triggerInputError();
        expect($("*[data-required]")).toHaveClass("error");
    });

    it('allows to change the default error class', function () {
        $("form").validateNicely().destroy();
        $("form").validateNicely({ 'errorClass': "customError" });

        triggerInputError();
        expect($("*[data-required]")).toHaveClass("customError");
    });

    it('set errors on submit when input fields have errors', function(){
        $("*[data-submit]").trigger("click");
        expect($(".error").length).toBeGreaterThan(0);
    });

    it('validates forms separately', function(){
        $("#my-form *[data-submit]").trigger("click");
        expect($("#my-form *[data-required]:first")).toHaveClass("error");
        expect($("#my-form-2 *[data-required]:first")).not.toHaveClass("error");
    });

    it('sends the form via ajax', function(){
        spyOn($, "post").and.callThrough();
        triggerInputError();
        $("#my-form *[data-submit]").trigger("click");
        expect($.post).not.toHaveBeenCalled();
        triggerInputSuccess();
        $("#my-form *[data-submit]").trigger("click");
        expect($.post).toHaveBeenCalled();
        expect($.post.calls.mostRecent().args[0]).toEqual($("#my-form").attr("action"));
        var data = {};
        $("#my-form *[name]").each(function(){
            data[$(this).attr("name")] = $(this).val();
        });

        expect($.post.calls.mostRecent().args[1]).toEqual(data);

    });

    function triggerInputError() {
        $("#my-form *[data-required]").val("   ");
        $("#my-form *[data-required]").trigger("click");
        $("#my-form *[data-required]").trigger("blur");
    }
    function triggerInputSuccess() {
        $("#my-form *[data-required]").val("Filled");
        $("#my-form *[data-required]").trigger("click");
        $("#my-form *[data-required]").trigger("blur");
    }
});