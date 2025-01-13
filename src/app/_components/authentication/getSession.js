// import resources from '../../resources/resources'

import config from '../config/config'
export default async function getSession(){
    let supabase=config.supabaseClient
    await supabase.auth.getSession()
}