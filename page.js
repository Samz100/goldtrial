'use client'
import { useState, useEffect } from 'react'

export default function Goldtrail(){
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState('')
  useEffect(()=>{
    const s = localStorage.getItem('goldtrail_user')
    if(s) setUser(JSON.parse(s))
  },[])
  const save = (u) => { setUser(u); localStorage.setItem('goldtrail_user', JSON.stringify(u)) }
  const earn = (amt) => { const u = {...user, balance: user.balance + amt, xp: (user.xp||0)+amt*10 }; save(u) }

  if(!user){
    return (
      <div style={{minHeight:'100vh', background:'radial-gradient(circle at top, #2a2200, #000)', display:'flex', alignItems:'center', justifyContent:'center', padding:20}}>
        <div style={{background:'#1c1800', padding:32, borderRadius:24, width:'100%', maxWidth:380, border:'1px solid #332b00'}}>
          <div style={{textAlign:'center'}}>
            <div style={{width:60, height:60, background:'linear-gradient(135deg,#FFD700,#FFA500)', borderRadius:16, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'center', fontSize:28}}>🪙</div>
            <h1 style={{color:'#FFD700', margin:'15px 0 5px'}}>GOLDTRAIL</h1>
            <p style={{color:'#8a7d4a', fontSize:13}}>Turn Your Time Into Gold 🇬🇭</p>
          </div>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Enter email" style={{width:'100%', padding:14, borderRadius:12, border:'1px solid #332b00', background:'#000', color:'#FFD700', marginTop:28}}/>
          <button onClick={()=>{ if(!email.includes('@')) return alert('Valid email'); save({email, username: email.split('@')[0], balance: 15, xp: 0}) }} style={{width:'100%', padding:14, background:'#FFD700', color:'black', border:'none', borderRadius:12, marginTop:12, fontWeight:'900'}}>CLAIM GH₵15 FREE</button>
        </div>
      </div>
    )
  }

  return (
    <div style={{minHeight:'100vh', background:'#050400', color:'white', paddingBottom:80, fontFamily:'sans-serif'}}>
      <div style={{maxWidth:500, margin:'0 auto', padding:15}}>
        <div style={{background:'linear-gradient(135deg,#FFD700,#FFA500)', padding:24, borderRadius:24, color:'black'}}>
          <p style={{margin:0, fontSize:12, fontWeight:'bold'}}>GOLD BALANCE</p>
          <h1 style={{fontSize:38, margin:'5px 0'}}>GH₵ {user.balance.toFixed(2)}</h1>
        </div>
        <div style={{background:'#121000', border:'1px solid #231f00', padding:16, borderRadius:16, display:'flex', justifyContent:'space-between', marginTop:20}}>
          <div><b>Watch Gold Ad</b><br/><small>+ GH₵ 2.50</small></div>
          <button onClick={()=>{earn(2.5); alert('🪙 +2.50')}} style={{background:'#FFD700', border:'none', padding:'9px 18px', borderRadius:10, fontWeight:'900'}}>MINE</button>
        </div>
        <div style={{background:'#121000', border:'1px solid #231f00', padding:16, borderRadius:16, display:'flex', justifyContent:'space-between', marginTop:10}}>
          <div><b>Invite Friend</b><br/><small style={{color:'#FFD700'}}>+ GH₵ 5.00</small></div>
          <button onClick={()=>{earn(5); alert('Link copied: goldtrail.vercel.app?ref='+user.username)}} style={{background:'white', border:'none', padding:'9px 18px', borderRadius:10, fontWeight:'900'}}>SHARE</button>
        </div>
        <div style={{background:'#121000', border:'1px solid #231f00', padding:16, borderRadius:16, display:'flex', justifyContent:'space-between', marginTop:10}}>
          <div><b>Spin Wheel</b><br/><small>Win up to GH₵20</small></div>
          <button onClick={()=>{let w=Math.floor(Math.random()*5)+1; earn(w); alert('Won GH₵'+w)}} style={{background:'#1e1a00', color:'#FFD700', border:'1px solid #332b00', padding:'9px 18px', borderRadius:10, fontWeight:'900'}}>SPIN</button>
        </div>
        <button onClick={()=>{ if(user.balance<20) return alert('Need GH₵20 min'); let n=prompt('MoMo Number:'); if(n){alert('Sent GH₵'+user.balance.toFixed(2)+' to '+n); save({...user,balance:0})} }} style={{width:'100%', padding:16, background:'white', color:'black', border:'none', borderRadius:14, fontWeight:'900', marginTop:22}}>Withdraw to MoMo →</button>
        <p onClick={()=>{localStorage.clear(); setUser(null)}} style={{textAlign:'center', opacity:0.3, fontSize:11, marginTop:20}}>Logout</p>
      </div>
    </div>
  )
}
