(function() {
    var e = moment().format("YYYY"),
        t = moment().format("MM"),
        s = {
            id: 1,
            events: [{
                id: "1",
                start: e + "-" + t + "-02",
                end: e + "-" + t + "-03",
                title: "Spruko Meetup",
                className: "bg-secondary-transparent",
                description: "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary"
            }, {
                id: "2",
                start: e + "-" + t + "-17",
                end: e + "-" + t + "-17",
                title: "Design Review",
                className: "bg-info-transparent",
                description: "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary"
            }, {
                id: "3",
                start: e + "-" + t + "-13",
                end: e + "-" + t + "-13",
                title: "Lifestyle Conference",
                className: "bg-primary-transparent",
                description: "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary"
            }, {
                id: "4",
                start: e + "-" + t + "-21",
                end: e + "-" + t + "-21",
                title: "Team Weekly Brownbag",
                className: "bg-warning-transparent",
                description: "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary"
            }, {
                id: "5",
                start: e + "-" + t + "-04T10:00:00",
                end: e + "-" + t + "-06T15:00:00",
                title: "Music Festival",
                className: "bg-success-transparent",
                description: "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary"
            }, {
                id: "6",
                start: e + "-" + t + "-23T13:00:00",
                end: e + "-" + t + "-25T18:30:00",
                title: "Attend Lea's Wedding",
                className: "bg-success-transparent",
                description: "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary"
            }]
        },
        i = {
            id: 2,
            className: "bg-info-transparent",
            textColor: "#fff",
            events: [{
                id: "7",
                start: e + "-" + t + "-04",
                end: e + "-" + t + "-04",
                title: "Harcates Birthday",
                description: "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary"
            }, {
                id: "8",
                start: e + "-" + t + "-28",
                end: e + "-" + t + "-28",
                title: "Bunnysin's Birthday",
                description: "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary"
            }, {
                id: "9",
                start: e + "-" + t + "-31",
                end: e + "-" + t + "-31",
                title: "Lee shin's Birthday",
                description: "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary"
            }, {
                id: "10",
                start: e + "-11-11",
                end: e + "-11-11",
                title: "Shinchan's Birthday",
                description: "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary"
            }]
        },
        d = {
            id: 3,
            className: "bg-danger-transparent",
            textColor: "#fff",
            events: [{
                id: "10",
                start: e + "-" + t + "-05",
                end: e + "-" + t + "-08",
                title: "Festival Day"
            }, {
                id: "11",
                start: e + "-" + t + "-18",
                end: e + "-" + t + "-19",
                title: "Memorial Day"
            }, {
                id: "12",
                start: e + "-" + t + "-25",
                end: e + "-" + t + "-26",
                title: "Diwali"
            }]
        },
        l = {
            id: 4,
            className: "bg-info-transparent",
            textColor: "#fff",
            events: [{
                id: "13",
                start: e + "-" + t + "-07",
                end: e + "-" + t + "-09",
                title: "My Rest Day"
            }, {
                id: "13",
                start: e + "-" + t + "-29",
                end: e + "-" + t + "-31",
                title: "My Rest Day"
            }]
        },
        o = document.getElementById("external-events");
    new FullCalendar.Draggable(o, {
        itemSelector: ".fc-event",
        eventData: function(n) {
            return {
                title: n.innerText.trim(),
                title: n.innerText,
                className: n.className + " overflow-hidden "
            }
        }
    });
    var c = document.getElementById("calendar2"),
        r = new FullCalendar.Calendar(c, {
            headerToolbar: {
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
            },
            defaultView: "month",
            navLinks: !0,
            businessHours: !0,
            editable: !0,
            selectable: !0,
            selectMirror: !0,
            droppable: !0,
            select: function(n) {
                var a = prompt("Event Title:");
                a && r.addEvent({
                    title: a,
                    start: n.start,
                    end: n.end,
                    allDay: n.allDay
                }), r.unselect()
            },
            eventClick: function(n) {
                confirm("Are you sure you want to delete this event?") && n.event.remove()
            },
            editable: !0,
            dayMaxEvents: !0,
            eventSources: [s, i, d, l]
        });
    r.render();
    var p = document.getElementById("full-calendar-activity");
    new SimpleBar(p, {
        autoHide: !0
    })
})();