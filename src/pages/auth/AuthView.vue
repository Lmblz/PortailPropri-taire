<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="authentification">
        <v-row class="authentification__wrapper justify-center align-center">
            <v-col cols="6">
                <v-card title="Portail propriétaire" elevation="5" class="pa-3" color="light">
                    <v-form validate-on="submit lazy" @submit.prevent="submit">
                        <v-text-field density="compact" label="Utilisateur" variant="outlined" autocomplete="username"
                            single-line class="mb-2" :rules="rules" v-model="username">
                        </v-text-field>
                        <v-text-field append-inner-icon="mdi-eye" density="compact" label="Mot de passe"
                            variant="outlined" single-line @click:append-inner="togglePassword"
                            :type="inputPassword.type" autocomplete="current-password" :rules="rules"
                            v-model="password">
                        </v-text-field>

                        <v-btn class="mt-2" type="submit" color="primary" :loading="isLoading" block>Se
                            connecter</v-btn>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script setup>
    import { reactive, ref, watch } from 'vue';
    import { useRouter } from 'vue-router';
    import { useUserStore } from '../../stores/user';

    const inputPassword = reactive({ type: "password" });
    const isLoading = ref(false);
    const isFormValid = ref(false);
    const username = ref("");
    const password = ref("")

    const user = useUserStore();
    const router = useRouter();

    const rules = [
        value => {
            if (value && value !== '') return true
            return 'Ce champ ne peut pas être vide'
        },
        value => {
            if (value && value.length >= 6) return true
            return 'Ce champ doit contenir au moins 6 caractères'
        }
    ]

    function togglePassword() {
        inputPassword.type == "password" ? inputPassword.type = "text" : inputPassword.type = "password";
    }

    function submit() {
        if (!isFormValid.value) return
        isLoading.value = true;
        setTimeout(() => {
            user.isAuth = true;
            user.name = username;
            router.push("/")
        }, 1000)
    }

    watch([username, password], () => {
        isFormValid.value = rules.every(rule => rule(username.value) === true && rule(password.value) === true);
        console.log(isFormValid)
    });
</script>

<style lang="scss">
    .authentification {
        height: 100%;

        &__wrapper {
            height: 100%;
        }
    }
</style>