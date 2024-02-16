import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const _session = ref(
    JSON.parse(localStorage.getItem("LOCALSTORACE_PLACEHOLDER:session")) || null
  );
  const _user = ref(
    JSON.parse(localStorage.getItem("LOCALSTORACE_PLACEHOLDER:user")) || null
  );
  const _profile = ref(
    JSON.parse(localStorage.getItem("LOCALSTORACE_PLACEHOLDER:profile")) || null
  );
  const _isAuthenticated = ref(
    JSON.parse(
      localStorage.getItem("LOCALSTORACE_PLACEHOLDER:isAuthenticated")
    ) || false
  );

  const session = computed(() => _session.value);
  const user = computed(() => _user.value);
  const profile = computed(() => _profile.value);
  const isAuthenticated = computed(() => _isAuthenticated.value);

  function setSession(session) {
    _session.value = session;
    localStorage.setItem(
      "LOCALSTORACE_PLACEHOLDER:session",
      JSON.stringify(session)
    );
  }

  function setUser(user) {
    _user.value = user;
    localStorage.setItem("LOCALSTORACE_PLACEHOLDER:user", JSON.stringify(user));
  }

  function setProfile(profile) {
    _profile.value = profile;
    localStorage.setItem(
      "LOCALSTORACE_PLACEHOLDER:profile",
      JSON.stringify(profile)
    );
  }

  function setIsAuthenticated(isAuthenticated) {
    _isAuthenticated.value = isAuthenticated;
    localStorage.setItem(
      "LOCALSTORACE_PLACEHOLDER:isAuthenticated",
      JSON.stringify(isAuthenticated)
    );
  }

  function resetStore() {
    _session.value = null;
    _user.value = null;
    _isAuthenticated.value = false;
    _profile.value = null;

    localStorage.removeItem("LOCALSTORACE_PLACEHOLDER:profile");
    localStorage.removeItem("LOCALSTORACE_PLACEHOLDER:isAuthenticated");
    localStorage.removeItem("LOCALSTORACE_PLACEHOLDER:session");
    localStorage.removeItem("LOCALSTORACE_PLACEHOLDER:user");
  }

  return {
    session,
    user,
    profile,
    isAuthenticated,
    setSession,
    setUser,
    setProfile,
    setIsAuthenticated,
    resetStore,
  };
});
