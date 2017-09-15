'use strict'
module.exports = validate
module.exports.list = validateList

const isCidrV4 = require('is-cidr').isCidrV4
const isCidrV6 = require('is-cidr').isCidrV6

function validate (cidr) {
  if (isCidrV6(cidr)) {
    throw new Error('CIDR whitelist can only contain IPv4 addresses, ' + cidr + ' is IPv6')
  }
  if (!isCidrV4(cidr)) {
    throw new Error('CIDR whitelist contains invalid CIDR entry: ' + cidr)
  }
}

function validateList (cidr_list) {
  const list = Array.isArray(cidr_list) ? cidr_list : cidr_list ? cidr_list.split(/,\s*/) : []
  list.forEach(validate)
  return list
}
