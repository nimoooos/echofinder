import type { SlotSize } from '@/interfaces/iItem';

/**
 * Not just for items, but hopefully also things like traits and talents and everything
 */
class SimpleItem {
  name: string;
  tags: string[];
  text: string;

  public constructor(item_data: { name: string; tags: string[]; text: string }) {
    this.name = item_data.name;
    this.tags = item_data.tags;
    this.text = item_data.text;
  }
}

class SimpleItemSlot {
  slot_size: SlotSize;
  loaded_item: null | SimpleItem;
  note: string;

  public constructor(size: SlotSize) {
    this.slot_size = size;
    this.loaded_item = null;
    this.note = '';
  }
}

export { SimpleItem, SimpleItemSlot };
