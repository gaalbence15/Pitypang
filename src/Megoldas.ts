import Pitypang from "./Pitypang";
import fs from 'fs';

export default class Megoldas {
    public _foglalasok: Pitypang[] = [];
    public osszBevetel: number = 0;
    public get leghosszabbTartozkodas(): string {
        let tartozkodas: number = 0;
        let maxTartozkodas: number = 0;
        let embör: Pitypang = this._foglalasok[0];
        for (const i of this._foglalasok) {
            tartozkodas = i._tavozasNapja - i._erkezesNapja;
            if (tartozkodas > maxTartozkodas) {
                maxTartozkodas = tartozkodas;
                embör = i;
            }
        }
        return `${embör._nev} (${embör._erkezesNapja}) - ${maxTartozkodas}`;
    }

    public bevetel(id: number): number {
        let jelenlegiFoglalas: Pitypang = this._foglalasok[id - 1];
        let bevetel: number = 0;
        if (jelenlegiFoglalas._vendegSzam > 2) {
            bevetel += 2000 * (jelenlegiFoglalas._vendegSzam - 2);
        }
        if (jelenlegiFoglalas._reggeli == 1) {
            bevetel += 1100 * jelenlegiFoglalas._vendegSzam * (jelenlegiFoglalas._tavozasNapja - jelenlegiFoglalas._erkezesNapja);
        }
        if (jelenlegiFoglalas._erkezesNapja < 120) {
            bevetel += 9000 * (jelenlegiFoglalas._tavozasNapja - jelenlegiFoglalas._erkezesNapja);
        }
        else if (jelenlegiFoglalas._erkezesNapja < 243) {
            bevetel += 10000 * (jelenlegiFoglalas._tavozasNapja - jelenlegiFoglalas._erkezesNapja);
        }
        else if (jelenlegiFoglalas._erkezesNapja <= 335) {
            bevetel += 8000 * (jelenlegiFoglalas._tavozasNapja - jelenlegiFoglalas._erkezesNapja);
        }
        this.osszBevetel += bevetel;
        return bevetel;
    }

    public fájlbaÍr(fájlNév: string, beírandó: string[]) {
        let beírandóNotArray: string = "";
        let counter:number = 1;
        for (const i of beírandó) {
            if (i != "0") {
                beírandóNotArray += counter + ":" + i + "\n";
                counter++;
            }
        }
        fs.writeFileSync(fájlNév, beírandóNotArray);
    }

    constructor(forras: string) {
        fs.readFileSync(forras)
            .toString()
            .split("\n")
            .forEach(i => {
                const aktSor: string = i.trim();
                this._foglalasok.push(new Pitypang(aktSor));
            });
    }
}