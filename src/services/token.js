// import ApiService from '@/services/api'
import QreditSltService from '@/services/qreditslt'

class TokenService {
  async find (id) {
    const response = await QreditSltService.getToken(id)

    var newresponse = {};

    try {

      newresponse.ownerAddress = response.tokenDetails.ownerAddress
      newresponse.tokenIdHex = response.tokenDetails.tokenIdHex
      newresponse.genesis_timestamp = response.tokenDetails.genesis_timestamp

      newresponse.genesis_timestamp = response.tokenDetails.genesis_timestamp
      newresponse.genesis_timestamp_unix = response.tokenDetails.genesis_timestamp_unix
      newresponse.symbol = response.tokenDetails.symbol
      newresponse.name = response.tokenDetails.name
      newresponse.documentUri = response.tokenDetails.documentUri
      newresponse.decimals = response.tokenDetails.decimals
      newresponse.genesisQuantity = response.tokenDetails.genesisQuantity

      newresponse.block_created_id = response.tokenStats.block_created_id
      newresponse.block_created_height = response.tokenStats.block_created_height
      newresponse.block_last_active_send = response.tokenStats.block_last_active_send
      newresponse.block_last_active_mint = response.tokenStats.block_last_active_mint
      newresponse.qty_valid_txns_since_genesis = response.tokenStats.qty_valid_txns_since_genesis
      newresponse.qty_valid_token_addresses = response.tokenStats.qty_valid_token_addresses
      newresponse.qty_token_minted = response.tokenStats.qty_token_minted
      newresponse.qty_token_burned = response.tokenStats.qty_token_burned
      newresponse.qty_token_circulating_supply = response.tokenStats.qty_token_circulating_supply
      newresponse.qty_xqr_spent = response.tokenStats.qty_xqr_spent

    } catch (e) {

      newreponse.error = e;

    }

    return newresponse

  }

  async getTransactions (id) {
  	const response = await QreditSltService.getTransactions(id)
  	return response
  }

  async getWalletTokens (address) {
    const response = await QreditSltService.getWalletTokens(address)
    const tokens = await QreditSltService.getTokens()
    response.forEach(function (item) {
      tokens.forEach(function (token) {
        if (token.tokenDetails.tokenIdHex === item.tokenIdHex) {
          item.name = token.tokenDetails.name
          item.symbol = token.tokenDetails.symbol
        }
      })
    })
  	return response
  }
}

export default new TokenService()
