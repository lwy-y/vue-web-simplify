<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <!-- 页面标题 -->
      <leftBorder title="角色管理"></leftBorder>
      <div class="main-center">
        <el-button
          type="primary"
          @click="roleAddOrEdit(0)"
          style="float:right;margin-bottom:12px"
        >新增</el-button>
        <!-- 列表 -->
        <div class="list-role">
          <el-table
            v-loading="loadingList"
            :data="tableData"
            style="width: 100%"
            border
          >
            <el-table-column
              fixed
              label="序号"
              width="55"
              align="center"
            >
              <template slot-scope="scope">{{scope.$index + 1}}</template>
            </el-table-column>
            <el-table-column
              prop="roleName"
              label="角色名称"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="createName"
              label="创建人"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="createTime"
              label="创建时间"
              align="center"
            >
              <template slot-scope="scope">{{scope.row.createTime|resetTime}}</template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="300"
              align="center"
              fixed="right"
            >
              <template slot-scope="scope">
                <el-button
                  type="text"
                  @click="roleAddOrEdit(1,scope.row.roleId)"
                >编辑</el-button>
                <el-button
                  type="text"
                  class="red"
                  @click="isDelete(scope.row)"
                >删除</el-button>
                <el-button
                  type="text"
                  @click="seeRoleList(scope.row.roleId)"
                >查看成员</el-button>
                <el-button
                  type="text"
                  @click="giveRolePower(scope.row.roleId,scope.row.roleName,scope.row.description)"
                >角色授权</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 分页 -->
        <div class="pagination">
          <el-pagination
            background
            layout="total, sizes, prev, pager, next, jumper"
            :current-page="query.pageNum"
            :page-size="query.pageSize"
            :total="rolePageTotal"
            @size-change="roleSizeChange"
            @current-change="rolePageChange"
          ></el-pagination>
        </div>
        <!-- 新增/编辑角色 -->
        <el-dialog
          :title="roleEditTitle"
          :visible.sync="addOredit"
          width="30%"
          :close-on-click-modal="false"
        >
          <el-form
            ref="roleForm"
            :rules="roleForms"
            :model="roleForm"
            label-width="100px"
          >
            <el-form-item
              label="角色名称"
              prop="roleName"
            >
              <el-input
                placeholder="请输入角色名称"
                v-model.trim="roleForm.roleName"
                maxlength="20"
                show-word-limit
              ></el-input>
            </el-form-item>
            <el-form-item
              label="角色说明"
              prop="description"
            >
              <el-input
                autocomplete="off"
                type="textarea"
                :rows="2"
                placeholder="请输入角色说明"
                v-model="roleForm.description"
                maxlength="200"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-form>
          <span
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="addOredit = false">取 消</el-button>
            <el-button
              type="primary"
              :loading="loadingBtn"
              @click="sureEdit('roleForm')"
            >确 定</el-button>
          </span>
        </el-dialog>
        <!-- 查看成员 -->
        <el-dialog
          title="查看成员"
          :visible.sync="seeRole"
          width="60%"
          class="roleEditTitle"
          :close-on-click-modal="false"
          :before-close="seeRoleBeforeClose"
        >
          <el-table
            :data="roleData"
            style="width: 100%"
            border
            v-loading="loading"
          >
            <el-table-column
              fixed
              label="序号"
              width="55"
              align="center"
            >
              <template slot-scope="scope">{{scope.$index + 1}}</template>
            </el-table-column>
            <el-table-column
              prop="userName"
              label="用户名称"
              width="180"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="userAccount"
              label="用户帐号"
              width="150"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="mobilePhone"
              label="联系电话"
              width="120"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="createName"
              label="创建人"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="createTime"
              label="创建时间"
              align="center"
              width="180"
            >
              <template slot-scope="scope">{{scope.row.createTime|resetTime}}</template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination
              background
              layout="total, sizes, prev, pager, next, jumper"
              :current-page="seeRoleQuery.pageNum"
              :page-size="seeRoleQuery.pageSize"
              :total="pageTotal"
              @size-change="handleSizeChange"
              @current-change="handlePageChange"
            ></el-pagination>
          </div>
          <span
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="seeRoleBeforeClose(false)">取 消</el-button>
          </span>
        </el-dialog>
        <!-- 角色授权 -->
        <el-dialog
          title="角色授权"
          :visible.sync="rolePower"
          width="60%"
          :close-on-click-modal="false"
          class="rolePower-padding"
        >
          <div style="display: flex;">
            <div style="flex:0.4">
              <div style="margin-bottom:12px">
                角色名称:<span style="margin-left:8px">{{roleName}}</span>
              </div>
              <el-tree
                ref="tree"
                :data="rolePowerData"
                show-checkbox
                :default-checked-keys="selectRole"
                @check="handleCheckChange"
                @node-click="nodeRoleClick"
                @check-change="treeCheckChange"
                node-key="menuId"
                :props="defaultProps"
              ></el-tree>
            </div>
            <!-- <div class="roleButtonTitle">角色说明：{{roleExplain|resetNull}}</div> -->
            <div
              class="roleListClass"
              :style="(buttonList&&buttonList.length)?'top:44%':'margin-top:8px'"
            >
              <el-checkbox-group
                v-model="roleButtonList"
                v-if="buttonList&&buttonList.length"
                @change="roleButtonChange"
              >
                <el-checkbox
                  v-for="item in buttonList"
                  :key="item.buttonId"
                  :label="item.buttonId"
                >{{item.buttonName}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <span
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="rolePower = false">取 消</el-button>
            <el-button
              type="primary"
              :loading="loadingBtn"
              @click="addRoleMenuRelatiin"
            >确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'roleManagement',
    data() {
        return {
            loading: false,
            loadingList: false,
            loadingBtn: false,
            tableData: [],
            roleData: [],
            selectRole: [],
            selectRoleKey: [],
            rolePowerData: [],
            buttonList: [],
            roleButtonList: [], //展示授权按钮数据
            roleButtonData: {}, //菜单按钮管理数据信息
            loadingList: false,
            roleEditTitle: '新增角色',
            roleIsEdit: 0, //0-新增角色，1-编辑角色
            roleExplain: '',
            roleName: '',
            rolePower: false,
            addOredit: false,
            seeRole: false,
            // 角色列表分页
            rolePageTotal: 0,
            query: {
                pageNum: 1,
                pageSize: 10
            },
            // 查看成员分页
            pageTotal: 0,
            seeRoleQuery: {
                id: '',
                pageNum: 1,
                pageSize: 10
            },
            roleForm: {},
            roleForms: {
                roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
                description: [{ required: true, message: '请填写角色说明', trigger: 'blur' }]
            },
            defaultProps: {
                children: 'menuVOList',
                label: 'menuName'
            }
        };
    },
    methods: {
        // 新增/编辑角色
        roleAddOrEdit(type, roleId) {
            this.roleForm = {};
            this.$nextTick(() => {
                this.$refs.roleForm.resetFields();
            });
            let title = ['新增角色', '编辑角色'];
            this.roleIsEdit = type;
            this.roleEditTitle = title[type];
            if (type === 1) {
                this.getRoleDetail(roleId);
            } else {
                this.addOredit = true;
            }
        },
        // 新增/编辑角色确认
        sureEdit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.roleIsEdit === 1) {
                        this.getRoleUpdate(this.roleForm);
                        // this.getData();
                    } else {
                        this.getRoleAdd(this.roleForm);
                        // this.getData();
                    }
                } else {
                    return false;
                }
            });
        },
        // 删除角色
        isDelete(row) {
            // 二次确认删除
            this.$confirm(`确定要删除${row.roleName}吗？`, '提示', {
                type: 'warning'
            })
                .then(() => {
                    // this.deleteRole(row.roleId);
                })
                .catch(() => {});
        },
        deleteRole(roleId) {
            getRoleDelete(roleId)
                .then(() => {
                    this.getData();
                    this.$message.success('删除成功！');
                })
                .catch((err) => {
                    console.error('删除失败：', err);
                });
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.seeRoleQuery, 'pageNum', val);
            this.seeRoleList(this.seeRoleQuery.id);
        },
        // 页数变化
        handleSizeChange(val) {
            this.$set(this.seeRoleQuery, 'pageSize', val);
            this.handlePageChange(1);
        },
        rolePageChange(val) {
            this.$set(this.query, 'pageNum', val);
            this.getRoleList(this.query);
        },
        roleSizeChange(val) {
            this.$set(this.query, 'pageSize', val);
            this.rolePageChange(1);
        },
        // 查看成员
        seeRoleBeforeClose(done) {
            this.$set(this.seeRoleQuery, 'pageNum', 1);
            this.seeRole = false;
            if (done) {
                done();
            }
        },
        // 添加角色与菜单关联
        addRoleMenuRelatiin() {
            this.loadingBtn = true;
            let query = {};
            query.roleId = this.roleId;
            query.menuIdList = this.selectRole;
            query.buttonIdList = this.roleButtonList;
            updateRoleMenuAndButton(query)
                .then(() => {
                    this.$message.success('修改权限成功！');
                    this.rolePower = false;
                    this.loadingBtn = false;
                })
                .catch((err) => {
                    this.loadingBtn = false;
                });
        },
        // 授权复选框点击事件
        handleCheckChange(data, checked, indeterminate) {
            let index = 0;
            this.selectRole = [];
            this.selectRole = checked.checkedKeys;
        },
        // 点击节点触发
        nodeRoleClick(data) {
            if (data.buttons && data.buttons.length) {
                this.buttonList = data.buttons;
                this.menuNowId = data.menuId;
            } else {
                this.buttonList = [];
            }
        },
        // 授权复选框选中删除对应授权数据
        treeCheckChange(data, checked) {
            if (!checked && this.roleButtonData[data.menuId]) {
                this.roleButtonList.forEach((item, index) => {
                    this.roleButtonData[data.menuId].forEach((ite) => {
                        if (item == parseInt(ite.buttonId)) {
                            // this.roleButtonList.splice(index, 1);
                            delete this.roleButtonList[index];
                        }
                    });
                });
                this.roleButtonList = this.roleButtonList.filter((buttonId) => {
                    return buttonId !== null || buttonId !== undefined;
                });
            }
        }
    }
};
</script>

<style scoped>
</style>