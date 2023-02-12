import {Validation} from "@/utils/Validation";
import {Alert} from "@/types/Alert";

export class FormValidation {
    alerts: Array<Alert> = [];
    uniqueLinks: Array<string> = [];

    isValid(links: Array<string>, maxLinks: number): boolean {
        const trimmedLinks = links.map((link) => link.trim());

        this.alerts.splice(0, this.alerts.length);

        if (trimmedLinks.length > maxLinks) {
            this.alerts.push({ type: 'alert-danger', message: `Zadali jste ${trimmedLinks.length} odkazů, limit je ${maxLinks}.` });
        }

        trimmedLinks.forEach((link, index) => {
            if (!Validation.isValidHeurekaUrl(link) || !Validation.isValidUrl(link)) {
                this.alerts.push({ type: 'alert-danger', message: `Odkaz na ${index + 1}. řádku neodkazuje na Heureka.cz/sk nebo je v nesprávném formátu (${link}).` });
            }
        });

        this.uniqueLinks = trimmedLinks.filter((item, index, self) => self.indexOf(item) === index);

        if (this.uniqueLinks.length !== trimmedLinks.length) {
            const duplicities = trimmedLinks.length - this.uniqueLinks.length;
            this.alerts.push({ type: 'alert-danger', message: `Zadali jste několik duplicitních řádků/odkazů (${duplicities}).` });
        }

        return this.alerts.length < 1;
    }

    getAlerts(): Array<Alert> {
        return this.alerts;
    }

    getUniqueLinks(): Array<string> {
        return this.uniqueLinks;
    }
}