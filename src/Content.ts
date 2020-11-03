import fs from "fs";
import http from "http";
import url from "url";
import Megoldas from './Megoldas';

export default class Content {
    public content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }
        // Weboldal inicializálása + head rész:
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'>");
        res.write("<head>");
        res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
        res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
        res.write("<title>Pitypang</title>");
        res.write("</head>");
        res.write("<body><form><pre class='m-3'>");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const params = url.parse(req.url as string, true).query;

        // Kezdd a kódolást innen -->
        const megoldas: Megoldas = new Megoldas("pitypang.txt");

        res.write("2. feladat\n");
        res.write(`${megoldas.leghosszabbTartozkodas}\n\n`);

        let osszBevetelek: string[] = [];
        for (let i = 1; i < megoldas._foglalasok.length; i++) {
            osszBevetelek.push(megoldas.bevetel(i).toString());
        }
        megoldas.fajlbaIr("bevetel.txt", osszBevetelek);

        res.write("3. feladat\n");
        res.write(`${megoldas.osszBevetel} Ft\n\n`);

        res.write("4. feladat\n");
        let stat: number[] = megoldas.statisztika;
        for (let i = 0; i < stat.length-1; i++) {
            res.write(`${i+1}. hónap: ${stat[i]} vendégéj.\n`);
        }

        res.write(`<a href="https://github.com/gaalbence15/Pitypang" target="_blank">GitHub</a>\n`);
        res.write(`<a href="https://pitypang-ts.herokuapp.com/" target="_blank">Heroku</a>\n`)

        // <---- Fejezd be a kódolást

        res.write("</pre></form>");7
        res.write("</body></html>");
        res.end();
    }
}
