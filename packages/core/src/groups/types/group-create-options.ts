import { PropertyKey } from '../../properties';
import { Group } from '../models';

export type GroupCreateOptions = Partial<{
    extendsGroup?: Group;
    mandatoryFields: PropertyKey[];
}>;
