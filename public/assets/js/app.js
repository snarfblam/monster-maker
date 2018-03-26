
var app = new (function () {
    this.builder = {
        body: 0,
        head: 0,
        eyes: 0,
    };

    function point(x, y) {
        return { x: x, y: y };
    }
    this.bodies = [
        {
            image: "body-bear.png",
            anchor: point(66, 108), // body anchor aligns with scene mount
            mount: point(66, 44), // body mount aligns with head anchor
            scale: 2,
        },
        {
            image: "body-bird.png",
            anchor: point(50, 130),
            mount: point(50, 56),
            scale: 2,
        },
        {
            image: "body-crab.png",
            anchor: point(50, 50),
            mount: point(50, 24),
            scale: 2,
        },
        {
            image: "body-knight.png",
            anchor: point(46, 104),
            mount: point(46, 44),
            scale: 2,
        },
        {
            image: "body-golem.png",
            anchor: point(50, 86),
            mount: point(46, 14),
            scale: 2,
        },
        {
            image: "body-wolf.png",
            anchor: point(42, 74),
            mount: point(46, 18),
            scale: 2,
        },
        {
            image: "body-ug.png",
            anchor: point(44, 108),
            mount: point(47, 27),
            scale: 1.5,
        },
        {
            image: "body-wizard.png",
            anchor: point(69, 81),
            mount: point(64, 21),
            scale: 1.5,
        },
    ];
    this.heads = [
        {
            image: "head-bear.png",
            anchor: point(20, 16),  // head anchor aligns with body mount
            eyeType: "grouped", // grouped, right, or both (grouped in one image, right-only, and both in separate image)
            mounts: [point(20, 10)], // head mount aligns with eye anchor
            scale: 2,
        }, {
            image: "head-bird.png",
            anchor: point(8, 32),
            eyeType: "right",
            mounts: [point(20, 28)],
            scale: 2,
        }, {
            image: "head-crab.png",
            anchor: point(30, 32),
            eyeType: "both",
            mounts: [point(12, 22), point(46, 22)],
            scale: 2,

        }, {
            image: "head-knight.png",
            anchor: point(12, 30),
            eyeType: "grouped", // grouped, right, or both
            mounts: [point(14, 22)],
            scale: 2,
        }, {
            image: "head-golem.png",
            anchor: point(12, 22),
            eyeType: "grouped", // grouped, right, or both
            mounts: [point(10, 22)],
            scale: 2,
        }, {
            image: "head-wolf.png",
            anchor: point(16, 24),
            eyeType: "grouped", // grouped, right, or both
            mounts: [point(14, 18)],
            scale: 2,
        }, {
            image: "head-ug.png",
            anchor: point(18, 18),
            eyeType: "grouped", // grouped, right, or both
            mounts: [point(22, 18)],
            scale: 1.5,
        }, {
            image: "head-wizard.png",
            anchor: point(13, 33),
            eyeType: "grouped", // grouped, right, or both
            mounts: [point(22, 24)],
            scale: 1.5,
        },
    ]
    this.eyes = [
        {
            grouped: {
                image: "eyes-bear.png",
                anchor: point(8, 6),
            },
            left: {
                image: "cleye-bear.png",
                anchor: point(4, 12),
            },
            right: {
                image: "creye-bear.png",
                anchor: point(10, 10),
            },
            rightOnly: {
                image: "reye-bear.png",
                anchor: point(8, 10),
            }
        }, {
            grouped: {
                image: "eyes-bird.png",
                anchor: point(8, 6),
            },
            left: {
                image: "cleye-bird.png",
                anchor: point(6, 8),
            },
            right: {
                image: "creye-bird.png",
                anchor: point(8, 8),
            },
            rightOnly: {
                image: "reye-bird.png",
                anchor: point(6, 8),
            }
        }, {
            grouped: {
                image: "eyes-crab.png",
                anchor: point(12, 10),
            },
            left: {
                image: "cleye-crab.png",
                anchor: point(8, 12),
            },
            right: {
                image: "creye-crab.png",
                anchor: point(8, 12),
            },
            rightOnly: {
                image: "reye-crab.png",
                anchor: point(8, 8),
            }
        }, {
            grouped: {
                image: "eyes-knight.png",
                anchor: point(10, 6),
            },
            left: {
                image: "cleye-knight.png",
                anchor: point(4, 8),
            },
            right: {
                image: "creye-knight.png",
                anchor: point(14, 8),
            },
            rightOnly: {
                image: "reye-knight.png",
                anchor: point(10, 8),
            }
        }, {
            grouped: {
                image: "eyes-golem.png",
                anchor: point(6, 4),
            },
            // left: {
            //     image: "cleye-golem.png",
            //     anchor: point(2, 4),
            // },
            // right: {
            //     image: "creye-golem.png",
            //     anchor: point(10, 6),
            // },
            left: {
                image: "cleye-golem.png",
                anchor: point(-6, 6),
            },
            right: {
                image: "creye-golem.png",
                anchor: point(18, 8),
            },
            rightOnly: {
                image: "reye-golem.png",
                anchor: point(4, 6),
            }
        }, {
            grouped: {
                image: "eyes-wolf.png",
                anchor: point(6, 4),
            },
            left: {
                image: "cleye-wolf.png",
                anchor: point(2, 10),
            },
            right: {
                image: "creye-wolf.png",
                anchor: point(10, 8),
            },
            rightOnly: {
                image: "reye-wolf.png",
                anchor: point(4, 6),
            }
        }, {
            grouped: {
                image: "eyes-ug.png",
                anchor: point(10, 7),
            },
            left: {
                image: "cleye-ug.png",
                anchor: point(10, 12),
            },
            right: {
                image: "creye-ug.png",
                anchor: point(6, 12),
            },
            rightOnly: {
                image: "reye-ug.png",
                anchor: point(11, 11),
            }
        }, {
            grouped: {
                image: "eyes-wizard.png",
                anchor: point(4, 4),
            },
            left: {
                image: "cleye-wizard.png",
                anchor: point(10, 14),
            },
            right: {
                image: "creye-wizard.png",
                anchor: point(6, 12),
            },
            rightOnly: {
                image: "reye-wizard.png",
                anchor: point(8, 10),
            }
        }
    ];


    this.createMonsterContainer = function () {
        var container = $('<div>').addClass('monster-container');
        container.append($('<img>').addClass('monster-body'));
        container.append($('<img>').addClass('monster-head'));
        container.append($('<img>').addClass('monster-eye-1'));
        container.append($('<img>').addClass('monster-eye-2'));
        return container[0];
    }
    // this.position = function (headElement, bodyElement, eye1Element, eye2Element, monster) {
    this.updateMonsterContainer = function (containerElement, monster) {
        var imgDir = "assets/mon-img/";
        var bodyPart = this.bodies[monster.body];
        var headPart = this.heads[monster.head];
        var eyePart = this.eyes[monster.eyes];

        var $container = $(containerElement);
        var $headElement = $container.find('.monster-head'); //$(headElement);
        var $bodyElement = $container.find('.monster-body');  //$(bodyElement);
        var $eye1Element = $container.find('.monster-eye-1');  //$(eye1Element);
        var $eye2Element = $container.find('.monster-eye-2');  //$(eye2Element);

        var offsetX = (bodyPart.mount.x - headPart.anchor.x);
        var offsetY = (bodyPart.mount.y - headPart.anchor.y);

        $bodyElement.css({
            left: 0,
            top: 0,
        });
        $headElement.css({
            left: offsetX,
            top: offsetY,
        });
        $headElement.attr('src', imgDir + headPart.image);
        $bodyElement.attr('src', imgDir + bodyPart.image);

        var eye1 = null;
        var eye2 = null;
        var eyeMounts = headPart.mounts;

        switch (headPart.eyeType) {
            case "grouped":
                eye1 = eyePart.grouped;
                break;
            case "both":
                eye1 = eyePart.left;
                eye2 = eyePart.right;
                break;
            case "right":
                eye1 = eyePart.rightOnly;
                break;
        }

        offsetX1 = offsetX + (eyeMounts[0].x - eye1.anchor.x);
        offsetY1 = offsetY + (eyeMounts[0].y - eye1.anchor.y);
        // eye 1
        $eye1Element.css({
            left: offsetX1,
            top: offsetY1,
        });
        $eye1Element.attr('src', imgDir + eye1.image)
        if (eye2) {
            offsetX2 = offsetX + (eyeMounts[1].x - eye2.anchor.x);
            offsetY2 = offsetY + (eyeMounts[1].y - eye2.anchor.y);

            $eye2Element.css({
                display: "inline",
                left: offsetX2,
                top: offsetY2,
            });
            $eye2Element.attr('src', imgDir + eye2.image)
        } else {
            $eye2Element.css({
                display: "none",
            });
        }
        //     var imgDir = "assets/mon-img/";
        //     var bodyPart = this.bodies[monster.body];
        //     var headPart = this.heads[monster.head];
        //     var eyePart = this.eyes[monster.eyes];

        //     var $headElement = $(headElement);
        //     var $bodyElement = $(bodyElement);
        //     var $eye1Element = $(eye1Element);
        //     var $eye2Element = $(eye2Element);

        //     var headScale = bodyPart.scale / headPart.scale;
        //     var eyeScale = headScale / this.heads[monster.eyes].scale; // lazy--eye images have the same scale as head images

        //     var offsetX = (bodyPart.mount.x - headPart.anchor.x) * headScale;
        //     var offsetY = (bodyPart.mount.y - headPart.anchor.y) * headScale;

        //     $headElement.css({
        //         left: offsetX,
        //         top: offsetY,
        //         transform: "scale(" + headScale + ")",
        //     });
        //     $headElement.attr('src', imgDir + headPart.image);
        //     $bodyElement.attr('src', imgDir + bodyPart.image);

        //     var eye1 = null;
        //     var eye2 = null;
        //     var eyeMounts = headPart.mounts;

        //     switch (headPart.eyeType) {
        //         case "grouped":
        //             eye1 = eyePart.grouped;
        //             break;
        //         case "both":
        //             eye1 = eyePart.left;
        //             eye2 = eyePart.right;
        //             break;
        //         case "right":
        //             eye1 = eyePart.rightOnly;
        //             break;
        //     }

        //     offsetX1 = offsetX + (eyeMounts[0].x * headScale - eye1.anchor.x * eyeScale)/headScale;
        //     offsetY1 = offsetY + (eyeMounts[0].y * headScale - eye1.anchor.y * eyeScale)/headScale;
        //     // eye 1
        //     $eye1Element.css({
        //         left: offsetX1,
        //         top: offsetY1,
        //         transform: "scale(" + eyeScale + ")",
        //     });
        //     $eye1Element.attr('src', imgDir + eye1.image)
        //     if (eye2) {
        //         offsetX2 = offsetX + (eyeMounts[1].x * headScale - eye2.anchor.x * eyeScale);
        //         offsetY2 = offsetY + (eyeMounts[1].y * headScale - eye2.anchor.y * eyeScale);

        //         $eye2Element.css({
        //             display: "inline",
        //             left: offsetX2,
        //             top: offsetY2,
        //             transform: "scale(" + eyeScale + ")",
        //         });
        //         $eye1Element.attr('src', imgDir + eye2.image)
        //     } else {
        //         $eye2Element.css({
        //             display: "none",
        //         });
        //     }
    };
})();

$('#nudHead').on('click', onMonsterChanged);
$('#nudBody').on('click', onMonsterChanged);
$('#nudEyes').on('click', onMonsterChanged);


var monsterView = $('.builder-monster-view');
var container = app.createMonsterContainer();
monsterView.append(container);
var monster = {
    head: 0, body: 0, eyes: 0,
}
app.updateMonsterContainer(container, monster);

$('#eye-prev').on('click', function () {
    app.builder.eyes--;
    if (app.builder.eyes < 0) app.builder.eyes = app.eyes.length - 1;
    app.updateMonsterContainer(container, app.builder);
})
$('#eye-next').on('click', function () {
    app.builder.eyes++;
    if (app.builder.eyes >= app.eyes.length)  app.builder.eyes = 0;
    app.updateMonsterContainer(container, app.builder);
})
$('#head-prev').on('click', function () {
    app.builder.head--;
    if (app.builder.head < 0) app.builder.head = app.heads.length - 1;
    app.updateMonsterContainer(container, app.builder);
})
$('#head-next').on('click', function () {
    app.builder.head++;
    if (app.builder.head >= app.heads.length)  app.builder.head = 0;
    app.updateMonsterContainer(container, app.builder);
})
$('#body-prev').on('click', function () {
    app.builder.body--;
    if (app.builder.body < 0) app.builder.body = app.bodies.length - 1;
    app.updateMonsterContainer(container, app.builder);
})
$('#body-next').on('click', function () {
    app.builder.body++;
    if (app.builder.body >= app.bodies.length)  app.builder.body = 0;
    app.updateMonsterContainer(container, app.builder);
})


function onMonsterChanged() {
    var monster = { head: $('#nudHead').val(), body: $('#nudBody').val(), eyes: $('#nudEyes').val() };
    // app.position($('#head-box')[0], $('#body-box')[0], $('#eye-box-1'), $('#eye-box-2'), monster);
    app.updateMonsterContainer($('#test-container'), monster);
}