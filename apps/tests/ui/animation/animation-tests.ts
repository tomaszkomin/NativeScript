﻿import TKUnit = require("../../TKUnit");
import helper = require("../helper");
import pageModule = require("ui/page");
import labelModule = require("ui/label");
import stackLayoutModule = require("ui/layouts/stack-layout");
import colorModule = require("color");

// <snippet module="ui/animation" title="animation">
// # Animation
// Animating view properties requires the "ui/animation" module.
// ``` JavaScript
import animation = require("ui/animation");
// ```
// </snippet>

export var test_AnimatingProperties = function (done) {
    var mainPage: pageModule.Page;
    var label: labelModule.Label;
    var pageFactory = function (): pageModule.Page {
        label = new labelModule.Label();
        label.text = "label";
        var stackLayout = new stackLayoutModule.StackLayout();
        stackLayout.addChild(label);
        mainPage = new pageModule.Page();
        mainPage.content = stackLayout;
        return mainPage;
    };

    helper.navigate(pageFactory);
    TKUnit.waitUntilReady(() => { return label.isLoaded });

    // <snippet module="ui/animation" title="animation">
    // # Animating properties
    // ``` JavaScript
    label.animate({
        opacity: 0.75,
        backgroundColor: new colorModule.Color("Red"),
        translate: { x: 100, y: 100 },
        scale: { x: 2, y: 2 },
        rotate: 180,
        duration: 1000,
        delay: 100,
        iterations: 3,
        curve: label.ios ? UIViewAnimationCurve.UIViewAnimationCurveEaseIn : new android.view.animation.AccelerateInterpolator(1),
    })
        .then(() => {
        console.log("Animation finished.");
        // <hide>
        helper.goBack();
        done();
        // </hide>
    })
        .catch((e) => {
        console.log(e.message);
        // <hide>
        helper.goBack();
        done(e);
        // </hide>
    });
    // ```
    // </snippet>
}

export var test_CancellingAnimation = function (done) {
    var mainPage: pageModule.Page;
    var label: labelModule.Label;
    var pageFactory = function (): pageModule.Page {
        label = new labelModule.Label();
        label.text = "label";
        var stackLayout = new stackLayoutModule.StackLayout();
        stackLayout.addChild(label);
        mainPage = new pageModule.Page();
        mainPage.content = stackLayout;
        return mainPage;
    };

    helper.navigate(pageFactory);
    TKUnit.waitUntilReady(() => { return label.isLoaded });

    // <snippet module="ui/animation" title="animation">
    // # Cancelling animation
    // ``` JavaScript
    var animation1 = label.createAnimation({ translate: { x: 100, y: 100 } });
    animation1.play().finished
        .then(() => {
        console.log("Animation finished");
        // <hide>
        helper.goBack();
        done();
        // </hide>
    })
        .catch((e) => {
        console.log("Animation cancelled");
        // <hide>
        helper.goBack();
        done(e);
        // </hide>
    });
    animation1.cancel();
    // ```
    // </snippet>
}

export var test_ChainingAnimations = function (done) {
    var mainPage: pageModule.Page;
    var label: labelModule.Label;
    var pageFactory = function (): pageModule.Page {
        label = new labelModule.Label();
        label.text = "label";
        var stackLayout = new stackLayoutModule.StackLayout();
        stackLayout.addChild(label);
        mainPage = new pageModule.Page();
        mainPage.content = stackLayout;
        return mainPage;
    };
    helper.navigate(pageFactory);
    TKUnit.waitUntilReady(() => { return label.isLoaded });

    // <snippet module="ui/animation" title="animation">
    // # Chaining animations
    // ``` JavaScript
    label.animate({ opacity: 0 })
        .then(() => label.animate({ opacity: 1 }))
        .then(() => label.animate({ translate: { x: 200, y: 200 } }))
        .then(() => label.animate({ translate: { x: 0, y: 0 } }))
        .then(() => label.animate({ scale: { x: 5, y: 5 } }))
        .then(() => label.animate({ scale: { x: 1, y: 1 } }))
        .then(() => label.animate({ rotate: 180 }))
        .then(() => label.animate({ rotate: 0 }))
        .then(() => {
        console.log("Animation finished");
        // <hide>
        helper.goBack();
        done();
        // </hide>
    })
        .catch((e) => {
        console.log(e.message);
        // <hide>
        helper.goBack();
        done(e);
        // </hide>
    });
    // ```
    // </snippet>
}

export var test_ReusingAnimations = function (done) {
    var mainPage: pageModule.Page;
    var label: labelModule.Label;
    var pageFactory = function (): pageModule.Page {
        label = new labelModule.Label();
        label.text = "label";
        var stackLayout = new stackLayoutModule.StackLayout();
        stackLayout.addChild(label);
        mainPage = new pageModule.Page();
        mainPage.content = stackLayout;
        return mainPage;
    };

    helper.navigate(pageFactory);
    TKUnit.waitUntilReady(() => { return label.isLoaded });

    // <snippet module="ui/animation" title="animation">
    // # Reusing animations
    // ``` JavaScript
    var animation1 = label.createAnimation({ translate: { x: 100, y: 100 } });
    var animation2 = label.createAnimation({ translate: { x: 0, y: 0 } });

    animation1.play().finished
        .then(() => animation2.play().finished)
        .then(() => animation1.play().finished)
        .then(() => animation2.play().finished)
        .then(() => animation1.play().finished)
        .then(() => animation2.play().finished)
        .then(() => {
        console.log("Animation finished");
        // <hide>
        helper.goBack();
        done();
        // </hide>
    })
        .catch((e) => {
        console.log(e.message);
        // <hide>
        helper.goBack();
        done(e);
        // </hide>
    });
    // ```
    // </snippet>
}

export var test_AnimatingMultipleViews = function (done) {
    var mainPage: pageModule.Page;
    var label1: labelModule.Label;
    var label2: labelModule.Label;
    var label3: labelModule.Label;
    var pageFactory = function (): pageModule.Page {
        label1 = new labelModule.Label();
        label1.text = "label1";
        label2 = new labelModule.Label();
        label2.text = "label2";
        label3 = new labelModule.Label();
        label3.text = "label3";
        var stackLayout = new stackLayoutModule.StackLayout();
        stackLayout.addChild(label1);
        stackLayout.addChild(label2);
        stackLayout.addChild(label3);
        mainPage = new pageModule.Page();
        mainPage.content = stackLayout;
        return mainPage;
    };
    helper.navigate(pageFactory);
    TKUnit.waitUntilReady(() => { return label1.isLoaded && label2.isLoaded });

    // <snippet module="ui/animation" title="animation">
    // # Animating multiple views simultaneously
    // ``` JavaScript
    var animations: Array<animation.AnimationDefinition> = [
        { target: label1, translate: { x: 200, y: 200 }, duration: 1000, delay: 0 },
        { target: label2, translate: { x: 200, y: 200 }, duration: 1000, delay: 333 },
        { target: label3, translate: { x: 200, y: 200 }, duration: 1000, delay: 666 },
    ];
    var animation = new animation.Animation(animations);
    animation.play().finished
        .then(() => {
        console.log("Animations finished");
        // <hide>
        helper.goBack();
        done();
        // </hide>
    })
        .catch((e) => {
        console.log(e.message);
        // <hide>
        helper.goBack();
        done(e);
        // </hide>
    });
    // ```
    // </snippet>
}