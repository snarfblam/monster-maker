
var app = new (function () {
    this.builder = {
        body: Math.floor(Math.random() * 8),
        head: Math.floor(Math.random() * 8),
        eyes: Math.floor(Math.random() * 8),
        /** 'create' or 'edit' */
        mode: "create",
        /** monster object to be updated if mode == 'edit' */
        monsterToEdit: null,
    };
    this.partyInfo = {
        activeMemberCount: 0,
    }

    function point(x, y) {
        return { x: x, y: y };
    }

    this.habitats = [
        "/assets/mon-habitat/cave.png",
        "/assets/mon-habitat/forest.png",
        "/assets/mon-habitat/plains.png",
        "/assets/mon-habitat/water-ruins.png",
    ];

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

    this.clearMonsterContainer = function (containerElement) {
        var $container = $(containerElement);
        $container.find('.monster-head').attr('src', '');
        $container.find('.monster-body').attr('src', '');
        $container.find('.monster-eye-1').attr('src', '');
        $container.find('.monster-eye-2').attr('src', '');
    }

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

        offsetX = 100 - bodyPart.anchor.x;
        offsetY = 100 - bodyPart.anchor.y;

        $bodyElement.css({
            left: offsetX + 'px',
            top: offsetY + 'px',
        });

        offsetX += (bodyPart.mount.x - headPart.anchor.x);
        offsetY += (bodyPart.mount.y - headPart.anchor.y);

        $headElement.css({
            left: offsetX + 'px',
            top: offsetY + 'px',
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
            left: offsetX1 + 'px',
            top: offsetY1 + 'px',
        });
        $eye1Element.attr('src', imgDir + eye1.image)
        if (eye2) {
            offsetX2 = offsetX + (eyeMounts[1].x - eye2.anchor.x);
            offsetY2 = offsetY + (eyeMounts[1].y - eye2.anchor.y);

            $eye2Element.css({
                display: "inline",
                left: offsetX2 + 'px',
                top: offsetY2 + 'px',
            });
            $eye2Element.attr('src', imgDir + eye2.image)
        } else {
            $eye2Element.css({
                display: "none",
            });
        }

    };
})();

// Set up builder UI
var monsterView = $('.builder-monster-view');
var builderContainer = app.createMonsterContainer();
monsterView.append(builderContainer);


// Render party members
var partyMemberUi = [
    { element: null, container: null, editLink: null, retireLink: null, monster: null },
    { element: null, container: null, editLink: null, retireLink: null, monster: null },
    { element: null, container: null, editLink: null, retireLink: null, monster: null },
    { element: null, container: null, editLink: null, retireLink: null, monster: null },
];

partyMemberUi.forEach(function (item, index) {
    item.element = $('.monster-' + (index + 1));
    item.editLink = $('#party-edit-' + index);
    item.retireLink = $('#party-retire-' + index);

    item.container = app.createMonsterContainer();
    item.element.append(item.container);
});

var currentParty = null;
partyList.forEach(function (party) {
    if (party.id == currentPartyId) currentParty = party;
});

var partyName = "(not found)";
var partyHabitat = 0;
if (currentParty) {
    partyName = currentParty.name || partyName;
    partyHabitat = currentParty.habitat || partyHabitat;
}
// partyList.forEach(function (party) {
//     if (party.id == currentPartyId) {
//         partyName = party.name;
//         partyHabitat = party.habitat;
//     }
// });
$('#party-label').text(partyName);

$('.party-backdrop').attr('src', app.habitats[partyHabitat] || app.habitats[0]);


displayPartyData();
updateBuilder();

// Render retired party members
partyData.forEach(function (monster) {
    if (monster.id && !monster.active) { // moster must exist and be inactive
        var holder = $('<div>').addClass('retired-monster-box');
        var contents = app.createMonsterContainer();
        holder.append(contents);
        app.updateMonsterContainer(contents, monster);

        $('.retired-list').append(holder);
    }
});


function updateBuilder() {
    app.updateMonsterContainer(builderContainer, app.builder);

    var submit = $('.builder-submit');

    if (app.builder.mode == 'create') {
        var partyFull = app.partyInfo.activeMemberCount >= 4;
        submit.prop('disabled', partyFull);
        submit.text(partyFull ? '(PARTY IS FULL)' : 'CREATE');
        $('.part-picker-left').prop('disabled', partyFull);
        $('.part-picker-right').prop('disabled', partyFull);
    } else if (app.builder.mode == 'edit') {
        submit.prop('disabled', false);
        submit.text('UPDATE');
    }
}


function displayPartyData() {
    var iContainer = 0;
    app.partyInfo.activeMemberCount = 0;

    if (partyData && partyData.forEach) {
        partyData.forEach(function(monster) {
            if (monster.active) {
                if (iContainer < 4) {
                    app.updateMonsterContainer(partyMemberUi[iContainer].container, monster);
                    partyMemberUi[iContainer].editLink.removeClass('hidden');
                    partyMemberUi[iContainer].retireLink.removeClass('hidden');
                    partyMemberUi[iContainer].monster = monster;
                    iContainer++;
                }
                app.partyInfo.activeMemberCount++;
            } else {
                // todo: create and update container in inactive monster section
            }
        });
    }

    for (var i = iContainer; i < 4; i++) {
        app.clearMonsterContainer(partyMemberUi[iContainer].container);
        partyMemberUi[i].editLink.addClass('hidden');
        partyMemberUi[i].retireLink.addClass('hidden');
    }

    // if (app.partyInfo.activeMemberCount >= 4) {
    //     $('.builder-submit').prop('disabled', true);
    // }
}

function displayModal(modalSelector) {
    var $modal = $('.modal');
    $modal.children().each(function () {
        $(this).hide();
    })

    $(modalSelector).show();
    $modal.show();

    $(document.body).addClass('fixed');
}

function hideModal() {
    $('.modal').hide();
    $(document.body).removeClass('fixed');
}

function changePartyHabitat(habitat) {


    if (!currentParty) return;

    currentParty.habitat = habitat;
    $.ajax({
        url: '/api/party/' + currentParty.id,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(currentParty),
    }).then(function (response) {
        if (response.error) {
            $('#modal-error-message').text("There was an error: " + response.error);
            displayModal('.modal-content-error');
            console.error(response);
        } else {
            location.reload();
        }
    }).catch(function (err) {
        console.log(err);
        $('#modal-error-message').text("There was an error: " + response.error);
        displayModal('.modal-content-error');
    });
}

{ // Event handlers
    $('#eye-prev').on('click', function () {
        app.builder.eyes--;
        if (app.builder.eyes < 0) app.builder.eyes = app.eyes.length - 1;
        app.updateMonsterContainer(builderContainer, app.builder);
    });

    $('#eye-next').on('click', function () {
        app.builder.eyes++;
        if (app.builder.eyes >= app.eyes.length) app.builder.eyes = 0;
        app.updateMonsterContainer(builderContainer, app.builder);
    });

    $('#head-prev').on('click', function () {
        app.builder.head--;
        if (app.builder.head < 0) app.builder.head = app.heads.length - 1;
        app.updateMonsterContainer(builderContainer, app.builder);
    });

    $('#head-next').on('click', function () {
        app.builder.head++;
        if (app.builder.head >= app.heads.length) app.builder.head = 0;
        app.updateMonsterContainer(builderContainer, app.builder);
    });

    $('#body-prev').on('click', function () {
        app.builder.body--;
        if (app.builder.body < 0) app.builder.body = app.bodies.length - 1;
        app.updateMonsterContainer(builderContainer, app.builder);
    });

    $('#body-next').on('click', function () {
        app.builder.body++;
        if (app.builder.body >= app.bodies.length) app.builder.body = 0;
        app.updateMonsterContainer(builderContainer, app.builder);
    });

    $('.party-edit').on('click', function () {
        var $this = $(this);
        var index = $this.attr('data-index');

        var monster = partyMemberUi[index].monster;
        app.builder.monsterToEdit = monster;
        app.builder.head = monster.head;
        app.builder.body = monster.body;
        app.builder.eyes = monster.eyes;
        app.builder.mode = 'edit';

        updateBuilder();
    });

    $('.party-picker').on('change', function () {
        var id = $('.party-picker').val();
        if (id == 'new') {
            displayModal('.modal-content-new-party');
        } else if (id == 'none') {
            // nothing
        } else {
            location.href = '/?party=' + id;
        }

        $('.party-picker').val('none');
    });

    $(document).on("click", "select option", function () {

    });


    $('#party-name-submit').on('click', function (e) {
        e.preventDefault();

        var name = $('#party-name-input').val().trim();
        if (name) {
            $.ajax({
                url: '/api/createparty',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    name: name,
                    habitat: 0
                })
            }).then(function (response) {
                if (response.id) {
                    location.href = '/?party=' + response.id;
                } else if (response.error) {
                    $('#modal-error-message').text("AN ERROR OCCURED.");
                    displayModal('.modal-content-error');
                }
            }).catch(function (err) {
                $('#modal-error-message').text("AN ERROR OCCURED.");
                displayModal('.modal-content-error');
            })
        } else {
            $('#modal-content-new-party-title').text("PLEASE ENTER A NAME");
        }


    });

    $('#party-name-cancel').on('click', function () {
        hideModal();
    });

    $('#error-ok').on('click', function () {
        hideModal();
    });

    $('.builder-submit').on('click', function () {
        var monster = {
            head: app.builder.head,
            body: app.builder.body,
            eyes: app.builder.eyes,
            active: 1,
            partyId: currentPartyId,
            name: "Joshua",
        };

        $.ajax({
            url: '/api/monster',
            method: 'POST',
            data: monster,
        }).then(function (response) {
            if (response.error) {
                $('#modal-error-message').text("There was an error: " + response.error);
                displayModal('.modal-content-error');
                console.error(response);
            } else {
                location.reload();
            }
        }).catch(function (err) {
            console.log(err);
            $('#modal-error-message').text("There was an error: " + response.error);
            displayModal('.modal-content-error');
        });
    });

    $('.party-retire').on('click', function () {
        var index = parseInt($(this).attr('data-index'));
        var uiStuff = partyMemberUi[index];
        var monster = uiStuff.monster;

        if (monster && monster.id) {
            monster.active = 0;

            $.ajax({
                url: '/api/monster/' + monster.id,
                method: 'POST',
                data: monster,
            }).then(function (response) {
                if (response.error) {
                    $('#modal-error-message').text("There was an error: " + response.error);
                    displayModal('.modal-content-error');
                    console.error(response);
                } else {
                    location.reload();
                }
            }).catch(function (err) {
                console.log(err);
                $('#modal-error-message').text("There was an error: " + response.error);
                displayModal('.modal-content-error');
            });
        }
    });

    $('.scene-picker-left').on('click', function () {
        var habitat = (partyHabitat == 0) ? 3 : partyHabitat - 1;
        changePartyHabitat(habitat);
    });

    $('.scene-picker-right').on('click', function () {
        var habitat = (partyHabitat == 3) ? 0 : partyHabitat + 1;
        changePartyHabitat(habitat);
    });
}
