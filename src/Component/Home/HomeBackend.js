const http = require("http");

http.createServer((request, response) => {
    console.log("Requested url: " + request.url);

    if (request.url.toLowerCase() === "/events") {
        response.writeHead(200, {
            Connection: "keep-alive",
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Access-Control-Allow-Origin": "*"
        });

        setTimeout(() => {
            response.write("event: portfolioAdded\n");
            response.write('data: {"name": "New User 100","id": "W123","state": ""}');
            response.write("\n\n");
        }, 3000);

        setTimeout(() => {
            //response.write("event: portfolioUpdated\n");
            response.write('data: {"id": "A123", "state": "Going to Class Room"}');
            response.write("\n\n");
        }, 6000);


        setTimeout(() => {
            response.write("event: portfolioAdded\n");
            response.write('data: {"name": "New User 2","id": "P123","state": ""}');
            response.write("\n\n");
        }, 9000);

        setTimeout(() => {
            //response.write("event: portfolioUpdated\n");
            response.write('data: {"id": "C123", "state": " working with father"}');
            response.write("\n\n");
        }, 12000);


    } else {
        response.writeHead(404);
        response.end();
    }
}).listen(3005, () => {
    console.log("Server running at http://localhost:3005");
});

