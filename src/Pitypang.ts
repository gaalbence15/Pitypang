export default class Pitypang {
    public _sorszam: number = 0;
    public _szobaszam: number = 0;
    public _erkezesNapja: number = 0;
    public _tavozasNapja: number = 0;
    public _vendegSzam: number = 0;
    public _reggeli: number = 0;
    public _nev: string = "";

    constructor(sor: string) {
        let m: string[] = sor.split(' ');
        if (m.length > 2) {
            this._sorszam = parseInt(m[0]);
            this._szobaszam = parseInt(m[1]);
            this._erkezesNapja = parseInt(m[2]);
            this._tavozasNapja = parseInt(m[3]);
            this._vendegSzam = parseInt(m[4]);
            this._reggeli = parseInt(m[5]);
            this._nev = m[6];
        }
    }
}
