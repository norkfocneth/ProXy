/* ============================================================
   PROXY — Notes Provider Engine
   Supabase client init, auth, upload, analytics
   ============================================================ */

const NotesProviderEngine = (() => {
  // Supabase config
  const SUPABASE_URL = 'https://iynmupzkeevjwjcgajxs.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5bm11cHprZWV2andqY2dhanhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM3NDY3NTMsImV4cCI6MjA5OTMyMjc1M30.JBqi4ZsbDhFb8Ic9BimXoCf0zCJbpc12XVkG-sydyFc';

  let db = null;
  let currentProvider = null;

  function getClient() {
    if (!db) {
      db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
    return db;
  }

  // ── Authentication ──
  async function login(providerId, password) {
    const client = getClient();
    const { data, error } = await client.rpc('verify_provider_login', {
      p_provider_id: providerId,
      p_password: password
    });

    if (error) {
      console.error('Login RPC error:', error);
      return { success: false, error: error.message };
    }

    if (data && data.success) {
      currentProvider = data.provider;
      // Store session in sessionStorage
      try {
        sessionStorage.setItem('proxy_provider', JSON.stringify(currentProvider));
      } catch (e) {}
      return { success: true, provider: currentProvider };
    }

    return { success: false, error: data?.error || 'Invalid credentials' };
  }

  function logout() {
    currentProvider = null;
    try {
      sessionStorage.removeItem('proxy_provider');
    } catch (e) {}
  }

  function getSession() {
    if (currentProvider) return currentProvider;
    try {
      const stored = sessionStorage.getItem('proxy_provider');
      if (stored) {
        currentProvider = JSON.parse(stored);
        return currentProvider;
      }
    } catch (e) {}
    return null;
  }

  // ── Analytics ──
  async function getStats(providerUuid) {
    const client = getClient();
    const { data, error } = await client.rpc('get_provider_stats', {
      p_provider_uuid: providerUuid
    });

    if (error) {
      console.error('Stats RPC error:', error);
      return null;
    }
    return data;
  }

  // ── Resources ──
  async function getResources(providerUuid) {
    const client = getClient();
    const { data, error } = await client.rpc('get_provider_resources', {
      p_provider_uuid: providerUuid
    });

    if (error) {
      console.error('Resources RPC error:', error);
      return [];
    }
    return data || [];
  }

  // ── File Upload ──
  async function uploadFile(file, providerUuid, resourceType, branch, semester, subject, unit) {
    const client = getClient();
    const fileExt = file.name.split('.').pop();
    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const unitFolder = unit ? `unit_${unit}` : 'unit_1';
    const filePath = `${branch}/${semester}/${subject}/${unitFolder}/${resourceType}/${timestamp}_${sanitizedName}`;

    const { data, error } = await client.storage
      .from('resources')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Upload error:', error);
      return { success: false, error: error.message };
    }

    // Get public URL
    const { data: urlData } = client.storage
      .from('resources')
      .getPublicUrl(filePath);

    return {
      success: true,
      fileUrl: urlData.publicUrl,
      filePath: filePath
    };
  }

  // ── Insert Resource ──
  async function insertResource(formData) {
    const client = getClient();
    
    // Call insert_resource RPC using exact 9-parameter signature supported by Supabase DB
    const { data, error } = await client.rpc('insert_resource', {
      p_provider_uuid: formData.providerUuid,
      p_resource_type: formData.resourceType,
      p_branch: formData.branch,
      p_semester: formData.semester,
      p_subject: formData.subject,
      p_year: formData.year,
      p_title: formData.title,
      p_description: formData.description,
      p_file_url: formData.fileUrl
    });

    if (error) {
      console.error('Insert resource RPC error:', error);
      return { success: false, error: error.message };
    }
    return data;
  }

  // ── Full Upload Flow ──
  async function uploadResource(formData, file, onProgress) {
    // Step 1: Upload file
    if (onProgress) onProgress(10, 'Uploading file...');

    const uploadResult = await uploadFile(
      file,
      formData.providerUuid,
      formData.resourceType,
      formData.branch,
      formData.semester,
      formData.subject,
      formData.unit
    );

    if (!uploadResult.success) {
      return { success: false, error: uploadResult.error };
    }

    if (onProgress) onProgress(70, 'Saving resource...');

    // Step 2: Insert resource record
    formData.fileUrl = uploadResult.fileUrl;
    const insertResult = await insertResource(formData);

    if (!insertResult.success) {
      return { success: false, error: insertResult.error };
    }

    if (onProgress) onProgress(100, 'Complete!');

    return { success: true, id: insertResult.id };
  }

  // ── Get subjects for branch + semester from syllabus-engine ──
  function getSubjects(branch, semester) {
    if (typeof getSyllabusData === 'function') {
      const data = getSyllabusData(branch, parseInt(semester));
      if (data && data.subjects) {
        return data.subjects.map(s => ({ code: s.code, title: s.title }));
      }
    }
    return [];
  }

  return {
    login,
    logout,
    getSession,
    getStats,
    getResources,
    uploadResource,
    getSubjects,
    getClient
  };
})();
