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
            console.log("R")
            console.log(obj)
        }

        var p = new P.jsexports.YahooPipe()
        p.fetch("6a99250ae0c6e00165d7ff28c7b8b4f8", gotresults)
        //ts.search("@vivainio", gotresults)
    }
}
