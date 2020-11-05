import fs from 'fs';
import Megoldas from "../Megoldas";

describe("Megoldas osztály unit tesztek", () => {
    const instance: Megoldas = new Megoldas("pitypang.txt");

    it("Megoldas osztálypéldány ellenőrzése", async () => {
        expect(instance).toBeInstanceOf(Megoldas);
    });

    it("Leghosszabb tartózkodás ellenőrzése", async () => {
        expect(instance.leghosszabbTartozkodas).toBe("Meszaros_Agnes (121) - 17");
    });

    it("Összbevétel ellenőrzése", async () => {
        for (let i = 1; i < instance._foglalasok.length; i++) {
            instance.bevetel(i);
        }
        expect(instance.osszBevetel).toBe(69704900);
    });

    it("Fájlok összehasonlítása", async () => {
        expect(fs.readFileSync("bevetel.txt").toString()).toBe(fs.readFileSync("bevetelFIN.txt").toString());
    });
});