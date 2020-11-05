import Pitypang from "./Pitypang";
import fs from 'fs';

export default class Megoldas {
    public _foglalasok: Pitypang[] = [];
    public foglaltszobakSzama: number = 0;
    public osszBevetel: number = 0;
    private kezdoNapok: number[] = [1, 32, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366];
    private vendegEjek: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    public szabadszobakSzama: number = 0;
    
    public get leghosszabbTartozkodas(): string {
        let tartozkodas: number = 0;
        let maxTartozkodas: number = 0;
        let ember: Pitypang = this._foglalasok[0];
        for (const i of this._foglalasok) {
            tartozkodas = i._tavozasNapja - i._erkezesNapja;
            if (tartozkodas > maxTartozkodas) {
                maxTartozkodas = tartozkodas;
                ember = i;
            }
        }
        return `${ember._nev} (${ember._erkezesNapja}) - ${maxTartozkodas}`;
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

    public fajlbaIr(fajlNev: string, beirando: string[]) {
        let beirandoNotArray: string = "";
        let counter: number = 1;
        for (const i of beirando) {
            if (i != "0") {
                beirandoNotArray += counter + ":" + i + "\n";
                counter++;
            }
        }
        fs.writeFileSync(fajlNev, beirandoNotArray);
    }

    public get statisztika() {
        let counter: number = 1;
        let counted: boolean = false;
        for (const i of this._foglalasok) {
            for (let j = i._erkezesNapja; j < i._tavozasNapja; j++) {
                do {
                    if (j < this.kezdoNapok[counter]) {
                        this.vendegEjek[counter - 1] += i._vendegSzam;
                        counted = true;
                    } else {
                        counter++;
                    }
                } while (!counted);
                counted = false;
            }
        }
        return this.vendegEjek;
    }

    public szabadSzobak(bekertKezdo: string, bekertEltoltendo: string): number {
        let bekertKezdoNumber: number = parseInt(bekertKezdo);
        let bekertEltoltendoNumber: number = parseInt(bekertEltoltendo);
        let tavozasNapjaNumber: number = bekertKezdoNumber + bekertEltoltendoNumber;
        for (const i of this._foglalasok) {
            if (i._erkezesNapja > bekertKezdoNumber && i._erkezesNapja < tavozasNapjaNumber) {
                this.foglaltszobakSzama++;
            }
            else if (i._tavozasNapja > bekertKezdoNumber && i._tavozasNapja < tavozasNapjaNumber) {
                this.foglaltszobakSzama++;
            }
            else if (i._erkezesNapja < bekertKezdoNumber && i._tavozasNapja > tavozasNapjaNumber) {
                this.foglaltszobakSzama++;
            }
        }
        return 27 - this.foglaltszobakSzama;
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