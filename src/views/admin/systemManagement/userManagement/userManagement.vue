<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <!-- 页面标题 -->
      <leftBorder title="用户管理"></leftBorder>
      <!-- 内容 -->
      <div class="main-center">
        <!-- 搜索 -->
        <div class="top-search">
          <el-form
            ref="query"
            :model="query"
            label-width="70px"
          >
            <el-row>
              <el-col :span="4">
                <el-form-item label="姓名">
                  <el-input
                    placeholder="请输入姓名"
                    v-model="query.name"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="岗位">
                  <el-select
                    v-model="query.name1"
                    placeholder="请选择岗位"
                  >
                    <el-option
                      label="web前端开发工程师"
                      value="name1"
                    ></el-option>
                    <el-option
                      label="java后台开发工程师"
                      value="name2"
                    ></el-option>
                    <el-option
                      label="IOS开发工程师"
                      value="name3"
                    ></el-option>
                    <el-option
                      label="Android开发工程师"
                      value="name4"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="等级">
                  <el-select
                    v-model="query.region"
                    placeholder="请选择等级"
                  >
                    <el-option
                      label="初级"
                      value="shanghai"
                    ></el-option>
                    <el-option
                      label="中级"
                      value="beijing"
                    ></el-option>
                    <el-option
                      label="高级"
                      value="beijing"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="状态">
                  <el-select
                    v-model="query.region1"
                    placeholder="请选择状态"
                  >
                    <el-option
                      label="在职"
                      value="shanghai1"
                    ></el-option>
                    <el-option
                      label="离职"
                      value="beijing1"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-button
                type="primary"
                style="margin-left:20px"
                @click="onSubmit"
              >查询</el-button>
              <el-button
                type="primary"
                @click="handleReset"
              >重置</el-button>
              <el-button
                type="primary"
                style="float:right"
                @click="onAddBtn"
              >新增</el-button>
            </el-row>
          </el-form>
        </div>
        <!-- 列表 -->
        <div class="list-users">
          <el-table
            v-loading="loading"
            :data="tableData"
            style="width: 100%;font-size:14px"
          >
            <el-table-column
              label="序号"
              width="55"
              align="center"
            >
              <template slot-scope="scope">{{scope.$index + 1}}</template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="100"
              align="center"
            >
              <template slot-scope="scope">
                {{scope.row.name?scope.row.name:"--"}}
              </template>
            </el-table-column>
            <el-table-column
              prop="userID"
              label="用户ID"
              width="110"
              align="center"
            >
              <template slot-scope="scope">
                {{scope.row.userID?scope.row.userID:"--"}}
              </template>
            </el-table-column>
            <el-table-column
              prop="sex"
              label="性别"
              width="60"
              align="center"
            >
              <template slot-scope="scope">
                {{scope.row.sex?scope.row.sex:"--"}}
              </template>
            </el-table-column>
            <el-table-column
              prop="position"
              label="岗位"
              width="160"
              align="center"
            >
              <template slot-scope="scope">
                {{scope.row.position?scope.row.position:"--"}}
              </template>
            </el-table-column>
            <el-table-column
              prop="grade"
              label="等级"
              width="100"
              align="center"
            >
              <template slot-scope="scope">
                {{scope.row.grade?scope.row.grade:"--"}}
              </template>
            </el-table-column>
            <el-table-column
              prop="state"
              label="状态"
              width="100"
              align="center"
            >
              <template slot-scope="scope">
                {{scope.row.state?scope.row.state:"--"}}
              </template>
            </el-table-column>
            <el-table-column
              prop="hiredate"
              label="入职时间"
              width="130"
              align="center"
            >
              <template slot-scope="scope">
                {{scope.row.hiredate?scope.row.hiredate:"--"}}
              </template>
            </el-table-column>
            <el-table-column
              prop="reason"
              label="入职原因"
              width="130"
              align="center"
            >
              <template slot-scope="scope">
                {{scope.row.reason?scope.row.reason:"--"}}
              </template>
            </el-table-column>
            <el-table-column
              prop="skill"
              label="技能"
              width="110"
              align="center"
            >
              <template slot-scope="scope">
                {{scope.row.skill?scope.row.skill:"--"}}
              </template>
            </el-table-column>
            <el-table-column
              prop="positiveTime"
              label="转正时间"
              width="130"
              align="center"
            >
              <template slot-scope="scope">
                {{scope.row.positiveTime?scope.row.positiveTime:"--"}}
              </template>
            </el-table-column>
            <el-table-column
              prop="resignationTime"
              label="离职时间"
              width="130"
              align="center"
            >
              <template slot-scope="scope">
                {{scope.row.resignationTime?scope.row.resignationTime:"--"}}
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
              width="120"
              fixed="right"
            >
              <template slot-scope="scope">
                <el-button
                  type="text"
                  @click="onEditBtn(scope.row)"
                >编辑</el-button>
                <el-button
                  type="text"
                  style="color:red"
                  @click="userDelete(scope.$index, scope.row.userId)"
                >删除</el-button>
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
            :total="pageTotal"
            @size-change="handleSizeChange"
            @current-change="handlePageChange"
          ></el-pagination>
        </div>
        <!-- 新增 -->
        <el-dialog
          title="新增用户"
          :visible.sync="addDialogVisible"
          width="40%"
        >
          <el-form
            :model="addRuleForm"
            :rules="rules"
            ref="addRuleForm"
            label-width="80px"
            class="demo-ruleForm"
          >
            <el-row :gutter="24">
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item
                    label="姓名"
                    prop="name"
                  >
                    <el-input
                      v-model="addRuleForm.name"
                      placeholder="请输入姓名"
                      style="width:157px"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item
                    label="邮箱"
                    prop="mailbox"
                  >
                    <el-input
                      v-model="addRuleForm.mailbox"
                      placeholder="请输入邮箱"
                      style="width:157px"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item
                    label="密码"
                    prop="password"
                  >
                    <el-input
                      v-model="addRuleForm.password"
                      placeholder="请输入密码"
                      style="width:157px"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item label="性别">
                    <el-select
                      v-model="addRuleForm.sex"
                      placeholder="请选择性别"
                      style="width:157px"
                    >
                      <el-option
                        label="男"
                        value="shanghai1111"
                      ></el-option>
                      <el-option
                        label="女"
                        value="beijing11112"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item
                    label="岗位"
                    prop="position"
                  >
                    <el-select
                      v-model="addRuleForm.position"
                      placeholder="请选择岗位"
                      style="width:157px"
                    >
                      <el-option
                        label="区域一"
                        value="shanghai11"
                      ></el-option>
                      <el-option
                        label="区域二"
                        value="beijing112"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item
                    label="等级"
                    prop="grade"
                  >
                    <el-select
                      v-model="addRuleForm.grade"
                      placeholder="请选择等级"
                      style="width:157px"
                    >
                      <el-option
                        label="初级"
                        value="shanghai111"
                      ></el-option>
                      <el-option
                        label="中级"
                        value="beijing1112"
                      ></el-option>
                      <el-option
                        label="高级"
                        value="beijing1113"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item label="技能">
                    <el-input
                      v-model="addRuleForm.skill"
                      placeholder="请输入技能"
                      style="width:157px"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item
                    label="入职时间"
                    prop="hiredate"
                  >
                    <el-date-picker
                      v-model="addRuleForm.hiredate"
                      type="date"
                      placeholder="请选择入职时间"
                      style="width:157px"
                    >
                    </el-date-picker>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item label="入职原因">
                    <el-input
                      v-model="addRuleForm.reason"
                      placeholder="请输入入职原因"
                      style="width:157px"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item label="转正时间">
                    <el-date-picker
                      v-model="addRuleForm.positiveTime"
                      type="date"
                      placeholder="请选择转正时间"
                      style="width:157px"
                    >
                    </el-date-picker>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item label="离职时间">
                    <el-date-picker
                      v-model="addRuleForm.resignationTime"
                      type="date"
                      placeholder="请选择离职时间"
                      style="width:157px"
                    >
                    </el-date-picker>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-form>
          <span
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button
              type="primary"
              @click="addSubmitForm('addRuleForm')"
            >确 定</el-button>
          </span>
        </el-dialog>
        <!-- 编辑 -->
        <el-dialog
          title="编辑用户"
          :visible.sync="editDialogVisible"
          width="40%"
        >
          <el-form
            :model="editRuleForm"
            :rules="rules"
            ref="editRuleForm"
            label-width="80px"
            class="demo-ruleForm"
          >
            <el-row :gutter="24">
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item
                    label="姓名"
                    prop="name"
                  >
                    <el-input
                      v-model="editRuleForm.name"
                      placeholder="请输入姓名"
                      style="width:157px"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item label="性别">
                    <el-select
                      v-model="editRuleForm.sex"
                      placeholder="请选择性别"
                      style="width:157px"
                    >
                      <el-option
                        label="男"
                        value="shanghai1111"
                      ></el-option>
                      <el-option
                        label="女"
                        value="beijing11112"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item
                    label="岗位"
                    prop="position"
                  >
                    <el-select
                      v-model="editRuleForm.position"
                      placeholder="请选择岗位"
                      style="width:157px"
                    >
                      <el-option
                        label="区域一"
                        value="shanghai11"
                      ></el-option>
                      <el-option
                        label="区域二"
                        value="beijing112"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item
                    label="等级"
                    prop="grade"
                  >
                    <el-select
                      v-model="editRuleForm.grade"
                      placeholder="请选择等级"
                      style="width:157px"
                    >
                      <el-option
                        label="初级"
                        value="shanghai111"
                      ></el-option>
                      <el-option
                        label="中级"
                        value="beijing1112"
                      ></el-option>
                      <el-option
                        label="高级"
                        value="beijing1113"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item
                    label="状态"
                    prop="state"
                  >
                    <el-select
                      v-model="editRuleForm.state"
                      placeholder="请选择状态"
                      style="width:157px"
                    >
                      <el-option
                        label="在职"
                        value="shanghai1"
                      ></el-option>
                      <el-option
                        label="离职"
                        value="beijing1"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item label="技能">
                    <el-input
                      v-model="editRuleForm.skill"
                      placeholder="请输入技能"
                      style="width:157px"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item
                    label="入职时间"
                    prop="hiredate"
                  >
                    <el-date-picker
                      v-model="editRuleForm.hiredate"
                      type="date"
                      placeholder="请选择入职时间"
                      style="width:157px"
                    >
                    </el-date-picker>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item label="入职原因">
                    <el-input
                      v-model="editRuleForm.reason"
                      placeholder="请输入入职原因"
                      style="width:157px"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item label="转正时间">
                    <el-date-picker
                      v-model="editRuleForm.positiveTime"
                      type="date"
                      placeholder="请选择转正时间"
                      style="width:157px"
                    >
                    </el-date-picker>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item label="离职时间">
                    <el-date-picker
                      v-model="editRuleForm.resignationTime"
                      type="date"
                      placeholder="请选择离职时间"
                      style="width:157px"
                    >
                    </el-date-picker>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-form>
          <span
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button
              type="primary"
              @click="editSubmitForm('editRuleForm')"
            >确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'userManagement',
    data() {
        return {
            // 搜索
            query: {
                name: '',
                name1: '',
                region: '',
                region1: ''
            },
            loading: false,
            // 列表
            tableData: [
                {
                    name: '王小虎',
                    userID: '001',
                    sex: '男',
                    position: 'web前端开发工程师',
                    grade: '初级',
                    state: '在职',
                    hiredate: '2021-01-01',
                    reason: '搬砖',
                    skill: 'vue',
                    positiveTime: '2021-04-01',
                    resignationTime: '2023-01-01'
                },
                {
                    name: '王小猫',
                    userID: '002',
                    sex: '男',
                    position: 'java后台开发工程师',
                    grade: '初级',
                    state: '在职',
                    hiredate: '2021-01-01',
                    reason: '搬砖',
                    skill: 'c++',
                    positiveTime: '2021-04-01',
                    resignationTime: '2023-01-01'
                },
                {
                    name: '王小名',
                    userID: '003',
                    sex: '女',
                    position: 'IOS开发工程师',
                    grade: '初级',
                    state: '离职',
                    hiredate: '2021-01-01',
                    reason: '搬砖',
                    skill: 'IOS',
                    positiveTime: '2021-04-01',
                    resignationTime: '2023-01-01'
                }
            ],
            // 分页
            pageTotal: 0,
            query: { pageNum: 1, pageSize: 10 },
            addDialogVisible: false,
            editDialogVisible: false,
            addRuleForm: {
                nanme: '',
                region: ''
            },
            editRuleForm: {
                nanme: '',
                region: ''
            },
            // 新增/编辑校验
            rules: {
                name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
                mailbox: [
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
                position: [{ required: true, message: '请选择岗位', trigger: 'change' }],
                grade: [{ required: true, message: '请选择等级', trigger: 'change' }],
                skill: [{ required: true, message: '请输入技能', trigger: 'change' }],
                hiredate: [{ required: true, message: '请选择入职时间', trigger: 'change' }]
            }
            //
        };
    },
    methods: {
        // 查询-重置
        onSubmit() {
            this.$set(this.query, 'pageNum', 1);
        },
        handleReset() {
            this.$set(this.query, 'name', '');
            this.$set(this.query, 'name1', '');
            this.$set(this.query, 'region', '');
            this.$set(this.query, 'region1', '');
        },
        // 分页
        handlePageChange(val) {
            this.$set(this.query, 'pageNum', val);
            this.getData();
        },
        handleSizeChange(val) {
            this.$set(this.query, 'pageSize', val);
            this.handlePageChange(1);
        },
        // 新增
        onAddBtn() {
            this.addRuleForm = {};
            this.addDialogVisible = true;
            this.$nextTick(() => {
                this.$refs.addRuleForm.resetFields();
            });
        },
        addSubmitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$message.success('新增成功！');
                    this.addDialogVisible = false;
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 编辑
        onEditBtn(row) {
            this.editRuleForm = { ...row };
            this.editDialogVisible = true;
            this.$nextTick(() => {
                this.$refs.editRuleForm.resetFields();
            });
        },
        editSubmitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$message.success('修改成功！');
                    this.editDialogVisible = false;
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 删除
        userDelete(index, userId) {
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    // this.carriersDelete(index, userId);
                })
                .catch(() => {});
        }
    }
};
</script>

<style scoped>

</style>