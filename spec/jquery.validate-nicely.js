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
        expect($("*[data-required]")).not.toHaveClass("error");

        $("#my-form").validateNicely();
        triggerInputError();
        expect($("*[data-required]")).toHaveClass("error");
    });

    it('allows to change the default error class', function () {
        $("form").validateNicely().destroy();
        $("form").validateNicely({ 'errorClass': "customError" });

        triggerInputError();
        expect($("*[data-required]")).toHaveClass("customError");
    })

    function triggerInputError() {
        $("*[data-required]").val("   ");
        $("*[data-required]").trigger("click");
        $("*[data-required]").trigger("blur");
    }
    function triggerInputSuccess() {
        $("*[data-required]").val("Filled");
        $("*[data-required]").trigger("click");
        $("*[data-required]").trigger("blur");
    }
});