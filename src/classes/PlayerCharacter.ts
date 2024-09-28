import type iAncestry from '@/interfaces/iAncestry';
import type { iSupport, iTechnique, iTrait, iWeapon } from '@/interfaces/iItem';
import type iJob from '@/interfaces/iJobs';
import type { iLicense } from '@/interfaces/iLicense';
import type { iTalentTree } from '@/interfaces/iTalent';
import type { SimpleItem, SimpleItemSlot } from './SimpleItem';

class PlayerCharacter {
  // #region Properties
  // name, title, pronouns
  private _name: string;
  private _title: string;
  private _pronouns: string;

  // basic character info
  private _ancestry: null | iAncestry;
  private _ancestry_trait: null | iTrait;
  private _job: null | iJob;

  private _level: number;
  private _bulk: number;
  private _agility: number;
  private _mind: number;
  private _magic: number;

  // attributes
  private _size: number;
  private _grit: number;
  private _recoveries: number;
  private _hp: number;
  private _armor: number;
  private _stress_cap: number;
  private _mp: number;
  private _scope: number;
  private _memory: number;
  private _save_target: number;
  private _speed: number;
  private _dodge: number;
  private _a_defense: number;

  private _limit_break: SimpleItem;
  private _traits: SimpleItem[];
  private _weapon_slots: SimpleItemSlot[];
  private _support_item_slots: SimpleItemSlot[];
  private _techniques: SimpleItem[];
  private _talents: iTalentTree[];

  private _unlocked_items: {
    ancestry_traits: iTrait[];
    jobs: iJob[];
    weapons: iWeapon[];
    support_items: iSupport[];
    techniques: iTechnique[];
  };

  private _point_allocation: {
    bulk: number;
    agility: number;
    mind: number;
    magic: number;

    talents: iTalentTree[];
    classes: iLicense[];
  };

  // #region Constructor
  public constructor() {
    this._name = 'Name';
    this._title = 'Title';
    this._pronouns = '(pro/nouns)';

    this._ancestry = null;
    this._ancestry_trait = null;
    this._job = null;

    this._level = 1;
    this._bulk = 0;
    this._agility = 0;
    this._mind = 0;
    this._magic = 0;

    this._size = 0;
    this._grit = 0;
    this._recoveries = 0;
    this._hp = 0;
    this._armor = 0;
    this._stress_cap = 0;
    this._mp = 0;
    this._scope = 0;
    this._memory = 0;
    this._save_target = 0;
    this._speed = 0;
    this._dodge = 0;
    this._a_defense = 0;

    this._limit_break = { name: 'No Limit Break', tags: [], text: 'No Limit Break' };
    this._traits = [];
    this._weapon_slots = [];
    this._support_item_slots = [];
    this._techniques = [];
    this._talents = [];

    this._unlocked_items = {
      ancestry_traits: [],
      jobs: [],
      weapons: [],
      support_items: [],
      techniques: [],
    };

    this._point_allocation = {
      bulk: 0,
      agility: 0,
      mind: 0,
      magic: 0,
      talents: [],
      classes: [],
    };
  }
  // #endregion

  // #region Getters
  public get name(): string {
    return this._name;
  }

  public get title(): string {
    return this._title;
  }

  public get pronouns(): string {
    return this._pronouns;
  }

  public get ancestry(): null | iAncestry {
    return this._ancestry;
  }

  public get ancestry_trait(): null | iTrait {
    return this._ancestry_trait;
  }

  public get job(): null | iJob {
    return this._job;
  }

  public get level(): number {
    return this._level;
  }

  public get bulk(): number {
    return this._bulk;
  }

  public get agility(): number {
    return this._agility;
  }

  public get mind(): number {
    return this._mind;
  }

  public get magic(): number {
    return this._magic;
  }

  public get bamm(): number[] {
    return [this.bulk, this.agility, this.mind, this.magic];
  }

  public get size(): number {
    return this._size;
  }

  public get grit(): number {
    return this._grit;
  }

  public get recoveries(): number {
    return this._recoveries;
  }

  public get hp(): number {
    return this._hp;
  }

  public get armor(): number {
    return this._armor;
  }

  public get stress_cap(): number {
    return this._stress_cap;
  }

  public get mp(): number {
    return this._mp;
  }

  public get scope(): number {
    return this._scope;
  }

  public get memory(): number {
    return this._memory;
  }

  public get save_target(): number {
    return this._save_target;
  }

  public get speed(): number {
    return this._speed;
  }

  public get dodge(): number {
    return this._dodge;
  }

  public get a_defense(): number {
    return this._a_defense;
  }

  public get attributes(): Object {
    return {
      size: this.size,
      grit: this.grit,
      recoveries: this.recoveries,
      hp: this.hp,
      armor: this.armor,
      stress_cap: this.stress_cap,
      mp: this.mp,
      scope: this.scope,
      memory: this.memory,
      save_target: this.save_target,
      speed: this.speed,
      dodge: this.dodge,
      a_defense: this.a_defense,
    };
  }

  public get limit_break(): SimpleItem {
    return this._limit_break;
  }
  public get traits(): SimpleItem[] {
    return this._traits;
  }
  public get weapon_slots(): SimpleItemSlot[] {
    return this._weapon_slots;
  }
  public get support_item_slots(): SimpleItemSlot[] {
    return this._support_item_slots;
  }
  public get techniques(): SimpleItem[] {
    return this._techniques;
  }
  public get talents(): iTalentTree[] {
    return this._talents;
  }

  public get unlocked_items(): Object {
    return this._unlocked_items;
  }

  public get unlocked_ancestry_traits(): iTrait[] {
    return this._unlocked_items.ancestry_traits;
  }

  public get unlocked_jobs(): iJob[] {
    return this._unlocked_items.jobs;
  }

  public get unlocked_weapons(): iWeapon[] {
    return this._unlocked_items.weapons;
  }

  public get unlocked_support_items(): iSupport[] {
    return this._unlocked_items.support_items;
  }

  public get unlocked_techniques(): iTechnique[] {
    return this._unlocked_items.techniques;
  }

  public get point_allocation(): Object {
    return this._point_allocation;
  }

  public get bulk_allocation(): number {
    return this._point_allocation.bulk;
  }

  public get agility_allocation(): number {
    return this._point_allocation.agility;
  }

  public get mind_allocation(): number {
    return this._point_allocation.mind;
  }
  public get magic_allocation(): number {
    return this._point_allocation.magic;
  }

  public get talent_allocation(): iTalentTree[] {
    return this._point_allocation.talents;
  }

  public get classes_allocation(): iLicense[] {
    return this._point_allocation.classes;
  }
  // #endregion

  // #region Setters
  public set name(new_name: string) {
    this._name = new_name;
  }
  public set title(new_title: string) {
    this._title = new_title;
  }
  public set pronouns(new_pronouns: string) {
    this._pronouns = new_pronouns;
  }
  public set ancestry(new_ancestry: null | iAncestry) {
    this._ancestry = new_ancestry;
  }
  public set ancestry_trait(new_ancestry_trait: null | iTrait) {
    this._ancestry_trait = new_ancestry_trait;
  }
  public set job(new_job: null | iJob) {
    this._job = new_job;
  }
  public set level(new_level: number) {
    this._level = new_level;
  }
  public set bulk(new_bulk: number) {
    this._bulk = new_bulk;
  }
  public set agility(new_agility: number) {
    this._agility = new_agility;
  }
  public set mind(new_mind: number) {
    this._mind = new_mind;
  }
  public set magic(new_magic: number) {
    this._magic = new_magic;
  }
  public set size(new_size: number) {
    this._size = new_size;
  }
  public set grit(new_grit: number) {
    this._grit = new_grit;
  }
  public set recoveries(new_recoveries: number) {
    this._recoveries = new_recoveries;
  }
  public set hp(new_hp: number) {
    this._hp = new_hp;
  }
  public set armor(new_armor: number) {
    this._armor = new_armor;
  }
  public set stress_cap(new_stress_cap: number) {
    this._stress_cap = new_stress_cap;
  }
  public set mp(new_mp: number) {
    this._mp = new_mp;
  }
  public set scope(new_scope: number) {
    this._scope = new_scope;
  }
  public set memory(new_memory: number) {
    this._memory = new_memory;
  }
  public set save_target(new_save_target: number) {
    this._save_target = new_save_target;
  }
  public set speed(new_speed: number) {
    this._speed = new_speed;
  }
  public set dodge(new_dodge: number) {
    this._dodge = new_dodge;
  }
  public set a_defense(new_a_defense: number) {
    this._a_defense = new_a_defense;
  }

  public set limit_break(new_limit_break: SimpleItem) {
    this._limit_break = new_limit_break;
  }
  public set traits(new_traits: SimpleItem[]) {
    this._traits = new_traits;
  }
  public set weapon_slots(new_weapon_slots: SimpleItemSlot[]) {
    this._weapon_slots = new_weapon_slots;
  }
  public set support_item_slots(new_support_item_slots: SimpleItemSlot[]) {
    this._support_item_slots = new_support_item_slots;
  }
  public set techniques(new_techniques: SimpleItem[]) {
    this._techniques = new_techniques;
  }
  public set talents(new_talents: iTalentTree[]) {
    this._talents = new_talents;
  }

  // setters for _unlocked_items
  public set unlocked_ancestry_traits(new_ancestry_traits: iTrait[]) {
    this._unlocked_items.ancestry_traits = new_ancestry_traits;
  }
  public set unlocked_jobs(new_jobs: iJob[]) {
    this._unlocked_items.jobs = new_jobs;
  }
  public set unlocked_weapons(new_weapons: iWeapon[]) {
    this._unlocked_items.weapons = new_weapons;
  }
  public set unlocked_support_items(new_support_items: iSupport[]) {
    this._unlocked_items.support_items = new_support_items;
  }
  public set unlocked_techniques(new_techniques: iTechnique[]) {
    this._unlocked_items.techniques = new_techniques;
  }

  // setters for _point_allocation
  public set bulk_allocation(new_bulk: number) {
    if (new_bulk % 1 == 0 && new_bulk >= 0 && new_bulk <= 6) {
      this._point_allocation.bulk = new_bulk;
    } else {
      console.log(`${new_bulk} is an invalid value for bulk.`);
    }
  }

  public set agility_allocation(new_agility: number) {
    if (new_agility % 1 == 0 && new_agility >= 0 && new_agility <= 6) {
      this._point_allocation.agility = new_agility;
    } else {
      console.log(`${new_agility} is an invalid value for agility.`);
    }
  }

  public set mind_allocation(new_mind: number) {
    if (new_mind % 1 == 0 && new_mind >= 0 && new_mind <= 6) {
      this._point_allocation.mind = new_mind;
    } else {
      console.log(`${new_mind} is an invalid value for mind.`);
    }
  }

  public set magic_allocation(new_magic: number) {
    if (new_magic % 1 == 0 && new_magic >= 0 && new_magic <= 6) {
      this._point_allocation.magic = new_magic;
    } else {
      console.log(`${new_magic} is an invalid value for magic.`);
    }
  }

  public set talents_allocation(new_talents: iTalentTree[]) {
    this._point_allocation.talents = new_talents;
  }

  public set classes_allocation(new_classes: iLicense[]) {
    this._point_allocation.classes = new_classes;
  }
  // #endregion

  /**
   * Recalculate the stat changes whenever ancestral trait, ancestry, job, bamm, or equipment changes
   */
  public recalculate(): void {
    console.log('Recalculating...');
    // stuff from ancestry (size and traits)
    if (this.ancestry == null) {
      console.log('No ancestry detected. Cannot determine size.');
      this.size = 0;
    } else {
      this.size = this.ancestry.size;
      this.unlocked_ancestry_traits = this.ancestry.traits;
    }

    // baseline attributes
    if (this.job == null) {
      console.log('No job detected. Cannot determine attributes.');
    } else {
      this.scope = this.job.baseStats.scope;
      this.save_target = this.job.baseStats.saveTarget;
      this.hp = this.job.baseStats.hp;
      this.recoveries = this.job.baseStats.recoveries;
      this.dodge = this.job.baseStats.dodge;
      this.speed = this.job.baseStats.speed;
      this.stress_cap = this.job.baseStats.stress;
      this.memory = this.job.baseStats.memory;
      this.a_defense = this.job.baseStats.adef;
      this.mp = this.job.baseStats.mp;
    }

    // baseline bamm
    this.bulk = this.bulk_allocation;
    this.agility = this.agility_allocation;
    this.mind = this.mind_allocation;
    this.magic = this.magic_allocation;

    // grit
    this.grit = Math.floor(this.level / 2);
    this.hp += this.grit;
    this.save_target += this.grit;
    this.memory += this.grit;

    // calculate bonuses from bamm
    this.hp += 2 * this.bulk;
    this.recoveries += Math.floor(this.bulk / 2);
    this.dodge += this.agility;
    this.speed += Math.floor(this.agility / 2);
    this.stress_cap += this.mind;
    this.memory += Math.floor(this.mind / 2);
    this.a_defense += this.magic;
    this.mp += Math.floor(this.magic / 2);

    // get license unlocks
  }
}

export { PlayerCharacter };
