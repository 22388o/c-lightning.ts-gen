/**
 * lightning-datastore -- Command for storing (plugin) data
 * 
 * **datastore** *key* \[*string*\] \[*hex*\] \[*mode*\] \[*generation*\] 
 * 
 */

/**
 * The **datastore** RPC command allows plugins to store data in the
 * c-lightning database, for later retrieval.
 * 
 * *key* is an array of values (though a single value is treated as a
 * one-element array), to form a hierarchy.  Using the first element of
 * the key as the plugin name (e.g. `[ "summary" ]`) is recommended.
 * A key can either have children or a value, never both: parents are
 * created and removed automatically.
 * 
 * *mode* is one of "must-create" (default, fails if it already exists),
 * "must-replace" (fails if it doesn't already exist),
 * "create-or-replace" (never fails), "must-append" (must already exist,
 * append this to what's already there) or "create-or-append" (append if
 * anything is there, otherwise create).
 * 
 * *generation*, if specified, means that the update will fail if the
 * previously-existing data is not exactly that generation.  This allows
 * for simple atomicity.  This is only legal with *mode* "must-replace"
 * or "must-append".
*/
export interface DatastoreRequest {
  key: /* GUESSED */ string;
  string?: /* GUESSED */ string;
  hex?: /* GUESSED */ string;
  mode?: /* GUESSED */ string;
  generation?: /* GUESSED */ string;
}

export interface DatastoreResponse {
  key: string[];
  /**
   * The number of times this has been updated
   */
  generation?: /* u64 */ number;
  /**
   * The hex data which has been added to the datastore
   */
  hex?: /* hex */ string;
  /**
   * The data as a string, if it's valid utf-8
   */
  string?: string;
}

