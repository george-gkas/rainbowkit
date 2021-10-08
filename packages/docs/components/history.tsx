import React from 'react'
import { useConnectOnMount, useExplorerTxHistory } from '@rainbowkit/hooks'
import { useWeb3React, Web3ReactProvider } from '@web3-react/core'
import { setupProvider, etherscanFetcher } from '@rainbowkit/utils'
import { ChainProvider } from 'chain-provider'
import { formatEther } from '@ethersproject/units'
import { injected } from './badge'

export const provider = new ChainProvider('homestead')

const HistoryExample = () => {
  const { account: address } = useWeb3React()

  useConnectOnMount(injected, true)

  const {
    data: txes,
    loading,
    error
  } = useExplorerTxHistory({
    address: address || '0xD3B282e9880cDcB1142830731cD83f7ac0e1043f',
    fetcher: etherscanFetcher,
    provider
  })

  if (error) return <strong style={{ color: 'red' }}>Error! {error?.message}</strong>

  if (loading) return <p>Loading...</p>

  return (
    <>
      {txes?.slice(0, 10).map((tx) => (
        <div key={tx.hash} style={{ fontFamily: 'monospace' }}>
          <a href={`https://etherscan.io/tx/${tx.hash}`}>{tx.hash.slice(0, 8)}</a>
          {' | '}
          <span>Value: {parseFloat(formatEther(tx.value)).toPrecision(3)} ETH</span>
        </div>
      ))}
    </>
  )
}

export const History = () => (
  <Web3ReactProvider getLibrary={setupProvider()}>
    <HistoryExample />
  </Web3ReactProvider>
)