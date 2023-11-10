<template>
	<div class="login">
		<v-row no-gutters>
			<v-col cols="12">
				<v-sheet
					color="tradewind500"
					rounded="lg"
					width="360"
					elevation="2"
					class="mx-auto pa-6"
				>
					<form>
						<v-img
							src="/images/logo-talachapp.webp"
							alt="Logo Control Unity"
							height="140"
							class="mb-3"
						/>
						<v-text-field
							v-model="signinData.cc"
							label="N° de identificación"
							type="number"
							min="0"
							aria-label="CC"
							variant="underlined"
							prepend-icon="mdi-clipboard-account"
							aria-autocomplete="none"
							required
							clearable
						></v-text-field>

						<v-text-field
							v-model="signinData.password"
							label="Contraseña"
							id="current-password"
							aria-label="current-password"
							autocomplete="false"
							variant="underlined"
							prepend-icon="mdi-lock"
							:append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
							:type="show ? 'text' : 'password'"
							@click:append="show = !show"
							aria-autocomplete="none"
							required
							clearable
						></v-text-field>

						<v-btn
							type="submit"
							block
							variant="elevated"
							color="tradewind800"
							rounded="xl"
							size="large"
							class="my-3"
						>
							Iniciar Sesión
						</v-btn>
						<router-link class="reset" to="/reset-password"
							>¿Has olvidado la contraseña? <br />
							Click Aquí</router-link
						>
					</form>
				</v-sheet>
			</v-col>
		</v-row>
	</div>
</template>
<script lang="ts" setup>
import {ref} from "vue";
// Interface
import type {SigninInput} from "@/interface";
// Let
let show = ref<Boolean>(false);
// Const
const signinData: SigninInput = {
	cc: 0,
	password: "",
};
</script>

<style>
.login {
	background: linear-gradient(
		190deg,
		rgba(112 192 185) 30%,
		rgba(44 96 93) 70%,
		rgba(41 81 80) 90%
	);
	height: 100vh;
	display: grid;
	place-items: center;
}

.reset {
	display: grid;
	place-items: center;
	color: #ffffff;
	text-decoration: none;
	text-align: center;
	&:hover {
		color: #214b4e;
		text-decoration: underline;
	}
}
</style>
