import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /*
  private supabase: SupabaseClient;

  constructor() { 
    this.supabase = createClient(environment.URL_API, environment.SUPABASEKEY);
  }

  async isAuthenticated(): Promise<boolean> {
    const session = await this.supabase.auth.getSession();
    return !!session;
  }
    */
}
