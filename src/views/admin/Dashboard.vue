<template>
  <div>
    <AdminUserList />
    <EditUserRoleModal />
  </div>
</template>

<script>
import AdminUserList from '@/components/admin/AdminUserList.vue'
import EditUserRoleModal from '@/components/admin/EditUserRoleModal.vue'

export default {
  components: {
    AdminUserList,
    EditUserRoleModal
  }
}
</script>
