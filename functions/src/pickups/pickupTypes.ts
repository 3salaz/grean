/** Define the Pickup interface */
export interface Pickup {
  id?: string;
  createdAt?: FirebaseFirestore.FieldValue;
  isAccepted: boolean;
  isCompleted: boolean;
  createdBy: {
    userId: string;
    displayName: string;
    email: string;
    photoURL: string;
    accountType?: "User" | "Driver";
  };
  addressData: { address: string };
  pickupDate: string;
  pickupTime: string;
  pickupNote?: string;
  materials: string[];
}

/** Type for creating a new pickup */
export interface CreatePickupData {
  isAccepted: boolean;
  isCompleted: boolean;
  createdBy: {
    userId: string;
    displayName: string;
    email: string;
    photoURL: string;
    accountType: "User" | "Driver";
  };
  addressData: { address: string };
  pickupDate: string;
  pickupTime: string;
  pickupNote?: string;
  materials: string[];
}

/** Type for updating an existing pickup */
export interface UpdatePickupData {
  pickupId: string;
  updates: Partial<Pickup>;
}

/** Type for updating a specific field of a pickup */
export interface UpdatePickupFieldData {
  pickupId: string;
  field: keyof Pickup;
  value: Pickup[keyof Pickup];
  operation?: PickupUpdateOperation;
}

/** Type for deleting a pickup */
export interface DeletePickupData {
  pickupId: string;
}

/** Type for update operation */
export type PickupUpdateOperation =
  | "update"
  | "addToArray"
  | "removeFromArray"
  | "set";
