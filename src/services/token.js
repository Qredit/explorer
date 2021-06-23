// import ApiService from '@/services/api'
import QreditSltService from '@/services/qreditslt'

class TokenService {
  async find(id) {
    const response = await QreditSltService.getToken(id)

    var newresponse = response[0]
    newresponse.ownerAddress = newresponse.tokenDetails.ownerAddress
    newresponse.tokenIdHex = newresponse.tokenDetails.tokenIdHex
    newresponse.genesis_timestamp = newresponse.tokenDetails.genesis_timestamp

    newresponse.genesis_timestamp = newresponse.tokenDetails.genesis_timestamp
    newresponse.genesis_timestamp_unix = newresponse.tokenDetails.genesis_timestamp_unix
    newresponse.symbol = newresponse.tokenDetails.symbol
    newresponse.name = newresponse.tokenDetails.name
    newresponse.documentUri = newresponse.tokenDetails.documentUri
    newresponse.decimals = newresponse.tokenDetails.decimals
    newresponse.genesisQuantity = newresponse.tokenDetails.genesisQuantity

    newresponse.block_created_id = newresponse.tokenStats.block_created_id
    newresponse.block_created_height = newresponse.tokenStats.block_created_height
    newresponse.block_last_active_send = newresponse.tokenStats.block_last_active_send
    newresponse.block_last_active_mint = newresponse.tokenStats.block_last_active_mint
    newresponse.qty_valid_txns_since_genesis = newresponse.tokenStats.qty_valid_txns_since_genesis
    newresponse.qty_valid_token_addresses = newresponse.tokenStats.qty_valid_token_addresses
    newresponse.qty_token_minted = newresponse.tokenStats.qty_token_minted
    newresponse.qty_token_burned = newresponse.tokenStats.qty_token_burned
    newresponse.qty_token_circulating_supply = newresponse.tokenStats.qty_token_circulating_supply
    newresponse.qty_xqr_spent = newresponse.tokenStats.qty_xqr_spent

    return newresponse
  }

  async getTransactions(id) {
    const response = await QreditSltService.getTransactions(id)
    return response
  }

  async getWalletTokens(address) {
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
