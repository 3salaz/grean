import * as admin from "firebase-admin";
const db = admin.firestore();

/** ✅ Updated Location Data Structure */
interface Location {
  locationType: string;
  address: string; // Combined full address
  latitude?: number;
  longitude?: number;
  homeName?: string;
  businessName?: string;
  businessPhoneNumber?: string;
  category?: string;
}

/** ✅ Create a new location
 * @param {string} uid - The user's unique ID.
 * @param {Location} data - The location details.
 * @return {Promise<{ locationId: string }>} The created location ID.
 */
export const createLocation = async (
    uid: string,
    data: Location
): Promise<{ locationId: string }> => {
  const locationData = {
    ...data,
    uid,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };
  const locationRef = await db.collection("locations").add(locationData);
  const locationId = locationRef.id;

  // Update the user's profile with the new location ID
  const profileRef = db.collection("profiles").doc(uid);
  await profileRef.update({
    locations: admin.firestore.FieldValue.arrayUnion(locationId),
  });

  return {locationId};
};

/** ✅ Update an existing location
 * @param {string} uid - The user's unique ID.
 * @param {string} locationId - The location ID to update.
 * @param {Partial<Location>} updates - The updates to apply.
 * @return {Promise<{ success: boolean }>} Success response.
 */
export const updateLocation = async (
    uid: string,
    locationId: string,
    updates: Partial<Location>
): Promise<{ success: boolean }> => {
  const locationRef = db.collection("locations").doc(locationId);
  const doc = await locationRef.get();

  if (!doc.exists || doc.data()?.uid !== uid) {
    throw new Error("Unauthorized: You cannot update this location.");
  }

  await locationRef.update(updates);
  return {success: true};
};

/** ✅ Delete a location
 * @param {string} uid - The user's unique ID.
 * @param {string} locationId - The location ID to delete.
 * @return {Promise<{ success: boolean }>} Success response.
 */
export const deleteLocation = async (
    uid: string,
    locationId: string
): Promise<{ success: boolean }> => {
  const locationRef = db.collection("locations").doc(locationId);
  const doc = await locationRef.get();

  if (!doc.exists || doc.data()?.uid !== uid) {
    throw new Error("Unauthorized: You cannot delete this location.");
  }

  // Delete the location document
  await locationRef.delete();

  // Remove the location ID from the user's profile's locations array
  const profileRef = db.collection("profiles").doc(uid);
  await profileRef.update({
    locations: admin.firestore.FieldValue.arrayRemove(locationId),
  });

  return {success: true};
};
