// Generated by CoffeeScript 1.3.3
var $;

$ = ender;

describe("Opentip", function() {
  var adapter;
  adapter = Opentip.adapters["native"];
  beforeEach(function() {
    return Opentip.adapter = adapter;
  });
  describe("debug()", function() {
    var consoleDebug;
    consoleDebug = console.debug;
    beforeEach(function() {
      return sinon.stub(console, "debug");
    });
    afterEach(function() {
      return console.debug.restore();
    });
    return it("should only debug when debugging == true", function() {
      Opentip.debugging = false;
      Opentip.prototype.debug("test");
      expect(console.debug.called).to.be["false"];
      Opentip.debugging = true;
      Opentip.prototype.debug("test");
      return expect(console.debug.called).to.be["true"];
    });
  });
  describe("constructor()", function() {
    before(function() {
      return sinon.stub(Opentip.prototype, "init");
    });
    after(function() {
      return Opentip.prototype.init.restore();
    });
    it("arguments should be optional", function() {
      var element, opentip;
      element = adapter.create("<div></div>");
      opentip = new Opentip(element, "content");
      expect(opentip.content).to.equal("content");
      expect(opentip.triggerElement).to.equal(element);
      opentip = new Opentip(element, "content", "title", {
        hideOn: "click"
      });
      expect(opentip.content).to.equal("content");
      expect(opentip.triggerElement).to.equal(element);
      expect(opentip.options.hideOn).to.equal("click");
      expect(opentip.options.title).to.equal("title");
      opentip = new Opentip(element, {
        hideOn: "click"
      });
      expect(opentip.triggerElement).to.equal(element);
      expect(opentip.options.hideOn).to.equal("click");
      expect(opentip.content).to.equal("");
      return expect(opentip.options.title).to.equal(void 0);
    });
    it("should use the href attribute if AJAX and an A element", function() {
      var element, opentip;
      element = $("<a href=\"http://testlink\">link</a>").get(0);
      opentip = new Opentip(element, {
        ajax: true
      });
      expect(opentip.options.ajax).to.be.a("object");
      return expect(opentip.options.ajax.url).to.equal("http://testlink");
    });
    it("should disable AJAX if neither URL or a link HREF is provided", function() {
      var element, opentip;
      element = $("<div>text</div>").get(0);
      opentip = new Opentip(element, {
        ajax: true
      });
      return expect(opentip.options.ajax).to.not.be.ok();
    });
    it("should disable a link if the event is onClick", function() {
      var element, opentip;
      sinon.spy(adapter, "observe");
      element = $("<a href=\"http://testlink\">link</a>").get(0);
      opentip = new Opentip(element, {
        showOn: "click"
      });
      expect(adapter.observe.calledOnce).to.be.ok();
      expect(adapter.observe.getCall(0).args[1]).to.equal("click");
      expect(adapter.observe.getCall(0).args[3]).to.be.ok();
      return adapter.observe.restore();
    });
    it("should take all options from selected style", function() {
      var element, opentip;
      element = document.createElement("div");
      opentip = new Opentip(element, {
        style: "glass",
        showOn: "click"
      });
      expect(opentip.options.showOn).to.equal("click");
      expect(opentip.options.className).to.equal("glass");
      return expect(opentip.options.stemSize).to.equal(8);
    });
    it("should set the options to fixed if a target is provided", function() {
      var element, opentip;
      element = document.createElement("div");
      opentip = new Opentip(element, {
        target: true,
        fixed: false
      });
      return expect(opentip.options.fixed).to.be.ok();
    });
    it("should use provided stem", function() {
      var element, opentip;
      element = document.createElement("div");
      opentip = new Opentip(element, {
        stem: ["center", "bottom"],
        tipJoin: ["left", "top"]
      });
      return expect(opentip.options.stem).to.eql(["center", "bottom"]);
    });
    it("should take the tipJoint as stem if stem is just true", function() {
      var element, opentip;
      element = document.createElement("div");
      opentip = new Opentip(element, {
        stem: true,
        tipJoin: ["left", "top"]
      });
      return expect(opentip.options.stem).to.eql(["left", "top"]);
    });
    it("should use provided target", function() {
      var element, element2, opentip;
      element = adapter.create("<div></div>");
      element2 = adapter.create("<div></div>");
      opentip = new Opentip(element, {
        target: element2
      });
      return expect(opentip.options.target).to.equal(element2);
    });
    it("should take the triggerElement as target if target is just true", function() {
      var element, opentip;
      element = adapter.create("<div></div>");
      opentip = new Opentip(element, {
        target: true
      });
      return expect(opentip.options.target).to.equal(element);
    });
    it("currentStemPosition should be set to inital stemPosition", function() {
      var element, opentip;
      element = adapter.create("<div></div>");
      opentip = new Opentip(element, {
        stem: ["left", "top"]
      });
      return expect(opentip.currentStemPosition).to.eql(["left", "top"]);
    });
    it("delay should be automatically set if none provided", function() {
      var element, opentip;
      element = document.createElement("div");
      opentip = new Opentip(element, {
        delay: null,
        showOn: "click"
      });
      expect(opentip.options.delay).to.equal(0);
      opentip = new Opentip(element, {
        delay: null,
        showOn: "mouseover"
      });
      return expect(opentip.options.delay).to.equal(0.2);
    });
    it("the targetJoint should be the inverse of the tipJoint if none provided", function() {
      var element, opentip;
      element = document.createElement("div");
      opentip = new Opentip(element, {
        tipJoint: ["left", "middle"]
      });
      expect(opentip.options.targetJoint).to.eql(["right", "middle"]);
      opentip = new Opentip(element, {
        tipJoint: ["center", "top"]
      });
      expect(opentip.options.targetJoint).to.eql(["center", "bottom"]);
      opentip = new Opentip(element, {
        tipJoint: ["right", "bottom"]
      });
      return expect(opentip.options.targetJoint).to.eql(["left", "top"]);
    });
    return it("should setup all trigger elements", function() {
      var element, opentip;
      element = adapter.create("<div></div>");
      opentip = new Opentip(element, {
        showOn: "click"
      });
      expect(opentip.showTriggerElementsWhenHidden).to.eql([
        {
          event: "click",
          element: element
        }
      ]);
      expect(opentip.showTriggerElementsWhenVisible).to.eql([]);
      expect(opentip.hideTriggerElements).to.eql([]);
      opentip = new Opentip(element, {
        showOn: "creation"
      });
      expect(opentip.showTriggerElementsWhenHidden).to.eql([]);
      expect(opentip.showTriggerElementsWhenVisible).to.eql([]);
      return expect(opentip.hideTriggerElements).to.eql([]);
    });
  });
  describe("setContent()", function() {
    return it("should update the content if tooltip currently visible", function() {
      var element, opentip, stub;
      element = document.createElement("div");
      opentip = new Opentip(element, {
        showOn: "click"
      });
      stub = sinon.stub(opentip, "updateElementContent");
      opentip.visible = false;
      opentip.setContent("TEST");
      expect(opentip.content).to.equal("TEST");
      opentip.visible = true;
      opentip.setContent("TEST2");
      expect(opentip.content).to.equal("TEST2");
      return expect(stub.callCount).to.equal(1);
    });
  });
  return describe("buildContainer()", function() {
    var element, opentip;
    element = document.createElement("div");
    opentip = new Opentip(element, {
      style: "glass",
      showEffect: "appear",
      hideEffect: "fade"
    });
    it("should set the id", function() {
      return expect(adapter.attr(opentip.container, "id")).to.equal("opentip-" + opentip.id);
    });
    return it("should set the classes", function() {
      var enderElement;
      enderElement = $(opentip.container[0]);
      expect(enderElement.hasClass("opentip-container")).to.be.ok();
      expect(enderElement.hasClass("completely-hidden")).to.be.ok();
      expect(enderElement.hasClass("style-glass")).to.be.ok();
      expect(enderElement.hasClass("show-effect-appear")).to.be.ok();
      return expect(enderElement.hasClass("hide-effect-fade")).to.be.ok();
    });
  });
});
