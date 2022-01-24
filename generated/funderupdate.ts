/**
 * lightning-funderupdate -- Command for adjusting node funding v2 channels
 * 
 * **funderupdate** \[*policy*\] \[*policy_mod*\] \[*leases_only*\] \[*min_their_funding_msat*\] \[*max_their_funding_msat*\] \[*per_channel_min_msat*\] \[*per_channel_max_msat*\] \[*reserve_tank_msat*\] \[*fuzz_percent*\] \[*fund_probability*\] \[*lease_fee_base_msat*\] \[*lease_fee_basis*\] \[*funding_weight*\] \[*channel_fee_max_base_msat*\] \[*channel_fee_max_proportional_thousandths*\] \[*compact_lease*\] 
 * 
 */

/**
 * For channel open requests using
 * 
 * 
 * *policy*, *policy_mod* is the policy the funder plugin will use to decide
 * how much capital to commit to a v2 open channel request. There are three
 * policy options, detailed below: `match`, `available`, and `fixed`.
 * The *policy_mod* is the number or 'modification' to apply to the policy.
 * Default is (fixed, 0sats).
 * 
 * * `match` -- Contribute *policy_mod* percent of their requested funds.
 *    Valid *policy_mod* values are 0 to 200. If this is a channel lease
 *    request, we match based on their requested funds. If it is not a
 *    channel lease request (and *lease_only* is false), then we match
 *    their funding amount. Note: any lease match less than 100 will
 *    likely fail, as clients will not accept a lease less than their request.
 * * `available` -- Contribute *policy_mod* percent of our available
 *    node wallet funds. Valid *policy_mod* values are 0 to 100.
 * * `fixed` -- Contributes a fixed  *policy_mod* sats to v2 channel open requests.
 * 
 * Note: to maximize channel leases, best policy setting is (match, 100).
 * 
 * *leases_only* will only contribute funds to `option_will_fund` requests
 * which pay to lease funds. Defaults to false, will fund any v2 open request
 * using *policy* even if it's they're not seeking to lease funds. Note that
 * `option_will_fund` commits funds for 4032 blocks (~1mo). Must also set
 * *lease_fee_base_msat*, *lease_fee_basis*, *funding_weight*,
 * *channel_fee_max_base_msat*, and *channel_fee_max_proportional_thousandths*
 * to advertise available channel leases.
 * 
 * *min_their_funding_msat* is the minimum funding sats that we require in order
 * to activate our contribution policy to the v2 open.  Defaults to 10k sats.
 * 
 * *max_their_funding_msat* is the maximum funding sats that we will consider
 * to activate our contribution policy to the v2 open. Any channel open above this
 * will not be funded.  Defaults to no max (`UINT_MAX`).
 * 
 * *per_channel_min_msat* is the minimum amount that we will contribute to a
 * channel open. Defaults to 10k sats.
 * 
 * *per_channel_max_msat* is the maximum amount that we will contribute to a
 * channel open. Defaults to no max (`UINT_MAX`).
 * 
 * *reserve_tank_msat* is the amount of sats to leave available in the node wallet.
 * Defaults to zero sats.
 * 
 * *fuzz_percent* is a percentage to fuzz the resulting contribution amount by.
 * Valid values are 0 to 100. Note that turning this on with (match, 100) policy
 * will randomly fail `option_will_fund` leases, as most clients
 * expect an exact or greater match of their `requested_funds`.
 * Defaults to 0% (no fuzz).
 * 
 * *fund_probability* is the percent of v2 channel open requests to apply our
 * policy to. Valid values are integers from 0 (fund 0% of all open requests)
 * to 100 (fund every request). Useful for randomizing opens that receive funds.
 * Defaults to 100.
 * 
 * Setting any of the next 5 options will activate channel leases for this node,
 * and advertise these values via the lightning gossip network. If any one is set,
 * the other values will be the default.
 * 
 * *lease_fee_base_msat* is the flat fee for a channel lease. Node will
 * receive this much extra added to their channel balance, paid by the opening
 * node. Defaults to 2k sats. Note that the minimum is 1sat.
 * 
 * *lease_fee_basis* is a basis fee that's calculated as 1/10k of the total
 * requested funds the peer is asking for. Node will receive the total of
 * *lease_fee_basis* times requested funds / 10k satoshis added to their channel
 * balance, paid by the opening node.  Default is 0.65% (65 basis points)
 * 
 * *funding_weight* is used to calculate the fee the peer will compensate your
 * node for its contributing inputs to the funding transaction. The total fee
 * is calculated as the `open_channel2`.`funding_feerate_perkw` times this
 * *funding_weight* divided by 1000. Node will have this funding fee added
 * to their channel balance, paid by the opening node.  Default is
 * 2 inputs + 1 P2WPKH output.
 * 
 * *channel_fee_max_base_msat* is a commitment to a maximum
 * `channel_fee_base_msat` that your node will charge for routing payments
 * over this leased channel during the lease duration.  Default is 5k sats.
 * 
 * *channel_fee_max_proportional_thousandths* is a commitment to a maximum
 * `channel_fee_proportional_millionths` that your node will charge for
 * routing payments over this leased channel during the lease duration.
 * Note that it's denominated in 'thousandths'. A setting of `1` is equal
 * to 1k ppm; `5` is 5k ppm, etc.  Default is 100 (100k ppm).
 * 
 * *compact_lease* is a compact description of the channel lease params. When
 * opening a channel, passed in to `fundchannel` to indicate the terms we
 * expect from the peer.
*/
export interface FunderupdateRequest {
  policy?: /* GUESSED */ string;
  policy_mod?: /* GUESSED */ string;
  leases_only?: /* GUESSED */ string;
  min_their_funding_msat?: /* GUESSED */ string;
  max_their_funding_msat?: /* GUESSED */ string;
  per_channel_min_msat?: /* GUESSED */ string;
  per_channel_max_msat?: /* GUESSED */ string;
  reserve_tank_msat?: /* GUESSED */ string;
  fuzz_percent?: /* GUESSED */ string;
  fund_probability?: /* GUESSED */ string;
  lease_fee_base_msat?: /* GUESSED */ string;
  lease_fee_basis?: /* GUESSED */ string;
  funding_weight?: /* GUESSED */ string;
  channel_fee_max_base_msat?: /* GUESSED */ string;
  channel_fee_max_proportional_thousandths?: /* GUESSED */ string;
  compact_lease?: /* GUESSED */ string;
}

export interface FunderupdateResponse {
  /**
   * Summary of the current funding policy e.g. (match 100)
   */
  summary: string;
  /**
   * Policy funder plugin will use to decide how much captial to commit to a v2 open channel request
   */
  policy: "match" | "available" | "fixed";
  /**
   * The *policy_mod* is the number or 'modification' to apply to the policy.
   */
  policy_mod: /* u32 */ number;
  /**
   * Only contribute funds to `option_will_fund` lease requests.
   */
  leases_only: boolean;
  /**
   * The minimum funding sats that we require from peer to activate our funding policy.
   */
  min_their_funding_msat: /* msat */ number;
  /**
   * The maximum funding sats that we'll allow from peer to activate our funding policy.
   */
  max_their_funding_msat: /* msat */ number;
  /**
   * The minimum amount that we will fund a channel open with.
   */
  per_channel_min_msat: /* msat */ number;
  /**
   * The maximum amount that we will fund a channel open with.
   */
  per_channel_max_msat: /* msat */ number;
  /**
   * Amount of sats to leave available in the node wallet.
   */
  reserve_tank_msat: /* msat */ number;
  /**
   * Percentage to fuzz our funding amount by.
   */
  fuzz_percent: /* u32 */ number;
  /**
   * Percent of opens to consider funding. 100 means we'll consider funding every requested open channel request.
   */
  fund_probability: /* u32 */ number;
  /**
   * Flat fee to charge for a channel lease.
   */
  lease_fee_base_msat?: /* msat */ number;
  /**
   * Proportional fee to charge for a channel lease, calculated as 1/10,000th of requested funds.
   */
  lease_fee_basis?: /* u32 */ number;
  /**
   * Transaction weight the channel opener will pay us for a leased funding transaction.
   */
  funding_weight?: /* u32 */ number;
  /**
   * Maximum channel_fee_base_msat we'll charge for routing funds leased on this channel.
   */
  channel_fee_max_base_msat?: /* msat */ number;
  /**
   * Maximum channel_fee_proportional_millitionths we'll charge for routing funds leased on this channel, in thousandths.
   */
  channel_fee_max_proportional_thousandths?: /* u32 */ number;
  /**
   * Compact description of the channel lease parameters.
   */
  compact_lease?: /* hex */ string;
  [k: string]: unknown;
}

