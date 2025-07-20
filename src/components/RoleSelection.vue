<template>
    <section class="fixed inset-0 bg-gradient-to-b from-[#F0F8FF] via-[#B8E7FC]/75 to-[#F0F8FF] flex items-center justify-center px-4">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md text-center space-y-6">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Select Your Role</h1>
            <p class="text-gray-600 dark:text-gray-300">Please choose your registration type</p>

            <button @click="goToDoctorRegister"
                class="w-full bg-[#368998] hover:bg-[#2B6E7A] text-white font-medium py-2 px-4 rounded-lg transition">
                👩‍⚕️ I'm a Doctor
            </button>

            <button @click="goToMoruRegister"
                class="w-full bg-[#368998] hover:bg-[#2B6E7A] text-white font-medium py-2 px-4 rounded-lg transition">
                🧪 I'm from MORU Research
            </button>
        </div>
    </section>
</template>

<script>
export default {
    name: "RoleSelection",
    methods: {
        goToDoctorRegister() {
            this.$router.push({ name: 'RegisterDoctor' });
        },
        goToMoruRegister() {
            this.$router.push({ name: 'RegisterMoru' });
        }
    }
    ,
};
</script>
