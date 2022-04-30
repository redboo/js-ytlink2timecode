function link2timecode() {
    const text = document.getElementById("text").value;
    const output = document.getElementById("output");
    const copy = document.getElementById("copy");
    const reset = document.getElementById("reset");

    if (
        (copy.style.visibility == "" || copy.style.visibility == "hidden") &&
        text.length > 0
    ) {
        copy.style.visibility = "visible";
        reset.style.visibility = "visible";
    }
    if (copy.style.visibility == "visible" && text.length == 0) {
        reset.style.visibility = "hidden";
        copy.style.visibility = "hidden";
    }

    rows = text.split("\n");
    result = [];
    for (const row of rows) {
        if (!row.trim().length) continue;
        const index = row.indexOf("https");
        const splitAt = (index, xs) => [xs.slice(0, index), xs.slice(index)];
        str = splitAt(index, row);

        const timeIndex = str[1].split("t=");
        const timeInteger = timeIndex[1].match(/(^[0-9]+)/g)[0];
        const time = timeInteger.toHHMMSS();
        result.push(time + " " + str[0].trim());
    }

    output.innerText = result.join("\n");
}

function resetForm() {
    document.getElementById("reset").style.visibility = "hidden";
    document.getElementById("copy").style.visibility = "hidden";
    document.getElementById("output").innerText = "";
}

function copy2clip() {
    const copyText = document.getElementById("output");
    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.innerText);
    /* Alert the copied text */
    alert("Copied the text: " + copyText.innerText);
}

String.prototype.toHHMMSS = function () {
    const sec_num = parseInt(this, 10); // don't forget the second param
    let hours = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - hours * 3600) / 60);
    let seconds = sec_num - hours * 3600 - minutes * 60;

    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;

    if (sec_num < 3600) return minutes + ":" + seconds;

    return hours + ":" + minutes + ":" + seconds;
};
