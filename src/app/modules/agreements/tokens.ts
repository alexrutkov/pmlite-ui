import {InjectionToken} from "@angular/core";
import {AgreementType} from "@modules/agreements/model/AgreementType";


export const AGREEMENT_TYPES = new InjectionToken<AgreementType[]>('Тип согласования')
export const AGREEMENT_URL = new InjectionToken<string>('URL согласований')
