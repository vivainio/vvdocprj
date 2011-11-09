import QtQuick 1.0

import "picplay_f.js" as P

Rectangle {
    width: 360
    height: 360
    Text {
        anchors.centerIn: parent
        text: "Hello World"
    }
    MouseArea {
        anchors.fill: parent
        onClicked: {
            Qt.quit();
        }
    }
    Component.onCompleted: {
        function gotresults(obj) {
            console.log("Got results!" + obj)
        }

        var ts = new P.jsexports.TwitterSearch()
        ts.search("@vivainio", gotresults)
    }
}
