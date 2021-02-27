const express = require("express");
const app = express();

app.get("/", function (req, res) {
    res.send(`
        <html>
            <div>
                <div id="app">
                    <h1>哔哩哔哩</h1>
                    <p class="demo">哔哩哔哩干杯</p>
                </div>
            </body>
        </html> 
    `);
});

app.listen(3000, () => {
    // eslint-disable-next-line no-console
    console.log("启动成功");
});
