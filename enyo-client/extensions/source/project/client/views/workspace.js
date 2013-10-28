/*jshint bitwise:true, indent:2, curly:true, eqeqeq:true, immed:true,
latedef:true, newcap:true, noarg:true, regexp:true, undef:true,
trailing:true, white:true, strict:false*/
/*global XT:true, XM:true, XV:true, enyo:true*/

(function () {

  XT.extensions.project.initWorkspaces = function () {
    var extensions;
 
    // ..........................................................
    // ACCOUNT
    //
  
    extensions = [
      {kind: "XV.AccountProjectsBox", container: "panels",
        attr: "projectRelations"}
    ];

    XV.appendExtension("XV.AccountWorkspace", extensions);

    // ..........................................................
    // CHARACTERISTIC
    //
  
    extensions = [
      {kind: "XV.ToggleButtonWidget", attr: "isProjects",
        label: "_projects".loc(), container: "rolesGroup"},
    ];

    XV.appendExtension("XV.CharacteristicWorkspace", extensions);

    // ..........................................................
    // CONFIGURE
    //

    enyo.kind({
      name: "XV.ProjectManagementWorkspace",
      kind: "XV.Workspace",
      title: "_configure".loc() + " " + "_project".loc(),
      model: "XM.ProjectManagement",
      components: [
        {kind: "Panels", arrangerKind: "CarouselArranger", fit: true, components: [
          {kind: "XV.Groupbox", name: "mainPanel", components: [
            {kind: "XV.ScrollableGroupbox", name: "mainGroup",
              classes: "in-panel", components: [
              {kind: "onyx.GroupboxHeader", content: "_default".loc()},
              {kind: "XV.PriorityPicker", attr: "DefaultPriority",
                label: "_priority".loc()}
            ]}
          ]}
        ]}
      ]
    });
  
    // ..........................................................
    // CONTACT
    //
  
    extensions = [
      {kind: "XV.ContactProjectsBox", container: "panels",
        attr: "projectRelations"}
    ];

    XV.appendExtension("XV.ContactWorkspace", extensions);

    // ..........................................................
    // INCIDENT
    //
  
    extensions = [
      {kind: "XV.ProjectWidget", container: "mainGroup", attr: "project"}
    ];

    XV.appendExtension("XV.IncidentWorkspace", extensions);

    // ..........................................................
    // PROJECT
    //

    var projectHash = {
      name: "XV.ProjectWorkspace",
      kind: "XV.Workspace",
      title: "_project".loc(),
      headerAttrs: ["number", "-", "name"],
      model: "XM.Project",
      components: [
        {kind: "Panels", arrangerKind: "CarouselArranger",
          classes: "xv-top-panel", fit: true, components: [
          {kind: "XV.Groupbox", name: "mainPanel", components: [
            {kind: "onyx.GroupboxHeader", content: "_overview".loc()},
            {kind: "XV.ScrollableGroupbox", name: "mainGroup", fit: true,
              classes: "in-panel", components: [
              {name: "overviewControl", components: [
                {kind: "XV.InputWidget", attr: "number"},
                {kind: "XV.InputWidget", attr: "name"},
                {kind: "XV.ProjectTypePicker", attr: "projectType"},
                {kind: "XV.ProjectStatusPicker", attr: "status"},
                {kind: "onyx.GroupboxHeader", content: "_schedule".loc()},
                {kind: "XV.DateWidget", attr: "dueDate"},
                {kind: "XV.DateWidget", attr: "startDate"},
                {kind: "XV.DateWidget", attr: "assignDate"},
                {kind: "XV.DateWidget", attr: "completeDate"},
                {kind: "onyx.GroupboxHeader", content: "_userAccounts".loc()},
                {kind: "XV.UserAccountWidget", attr: "owner"},
                {kind: "XV.UserAccountWidget", attr: "assignedTo"},
                {kind: "XV.ProjectCharacteristicsWidget", attr: "characteristics"},
                {kind: "onyx.GroupboxHeader", content: "_notes".loc()},
                {kind: "XV.TextArea", attr: "notes", fit: true},
                {kind: "onyx.GroupboxHeader", content: "_relationships".loc()},
                {kind: "XV.AccountWidget", attr: "account"},
                {kind: "XV.ContactWidget", attr: "contact"}
              ]}
            ]}
          ]},
          {kind: "XV.ProjectCommentBox", attr: "comments"},
          {kind: "XV.ContactDocumentsBox", attr: "documents"}
        ]}
      ],
      create: function () {
        this.inherited(arguments);
        var panels = this.$.panels;
        if (enyo.platform.touch) {
          panels.createComponents([
            {kind: "XV.ProjectTasksBox", attr: "tasks",
              addBefore: this.$.projectCommentBox},
            {kind: "XV.ProjectWorkflowBox", attr: "workflow",
              addBefore: this.$.projectCommentBox}
          ], {owner: this});
        } else {
          panels.createComponents([
            {kind: "XV.ProjectTasksGridBox", attr: "tasks",
              addBefore: this.$.projectCommentBox},
            {kind: "XV.ProjectWorkflowGridBox", attr: "workflow",
              addBefore: this.$.projectCommentBox}
          ], {owner: this});
        }
      }
    };

    projectHash = enyo.mixin(projectHash, XV.accountNotifyContactMixin);
    enyo.kind(projectHash);

    XV.registerModelWorkspace("XM.ProjectRelation", "XV.ProjectWorkspace");
    XV.registerModelWorkspace("XM.ProjectListItem", "XV.ProjectWorkspace");

    enyo.kind({
      name: "XV.TaskWorkspace",
      kind: "XV.Workspace",
      title: "_task".loc(),
      headerAttrs: ["number", "-", "name"],
      model: "XM.Task",
      components: [
        {kind: "Panels", arrangerKind: "CarouselArranger",
          classes: "xv-top-panel", fit: true, components: [
          {kind: "XV.Groupbox", name: "mainPanel", components: [
            {kind: "onyx.GroupboxHeader", content: "_overview".loc()},
            {kind: "XV.ScrollableGroupbox", name: "mainGroup", fit: true,
              classes: "in-panel", components: [
              {kind: "XV.ProjectWidget", attr: "project"},
              {kind: "XV.InputWidget", attr: "number"},
              {kind: "XV.InputWidget", attr: "name"},
              {kind: "XV.ProjectStatusPicker", attr: "status"},
              {kind: "onyx.GroupboxHeader", content: "_schedule".loc()},
              {kind: "XV.DateWidget", attr: "dueDate"},
              {kind: "XV.DateWidget", attr: "startDate"},
              {kind: "XV.DateWidget", attr: "assignDate"},
              {kind: "XV.DateWidget", attr: "completeDate"},
              {kind: "onyx.GroupboxHeader", content: "_hours".loc()},
              {kind: "XV.HoursWidget", attr: "budgetedHours",
               label: "_budgeted".loc()},
              {kind: "XV.HoursWidget", attr: "actualHours",
               label: "_actual".loc()},
              {kind: "onyx.GroupboxHeader", content: "_expenses".loc()},
              {kind: "XV.MoneyWidget", attr: {localValue: "budgetedExpenses"},
               label: "_budgeted".loc(), currencyShowing: false},
              {kind: "XV.MoneyWidget", attr: {localValue: "actualExpenses"},
               label: "_actual".loc(), currencyShowing: false},
              {kind: "onyx.GroupboxHeader", content: "_userAccounts".loc()},
              {kind: "XV.UserAccountWidget", attr: "owner"},
              {kind: "XV.UserAccountWidget", attr: "assignedTo"},
              {kind: "onyx.GroupboxHeader", content: "_notes".loc()},
              {kind: "XV.TextArea", attr: "notes", fit: true}
            ]}
          ]},
          {kind: "XV.TaskCommentBox", attr: "comments"}
        ]}
      ]
    });

    XV.registerModelWorkspace("XM.Task", "XV.TaskWorkspace");
    XV.registerModelWorkspace("XM.TaskListItem", "XV.TaskWorkspace");

    enyo.kind({
      name: "XV.ProjectTaskWorkspace",
      kind: "XV.Workspace",
      title: "_projectTask".loc(),
      model: "XM.ProjectTask",
      modelAmnesty: true,
      components: [
        {kind: "Panels", arrangerKind: "CarouselArranger",
          classes: "xv-top-panel", fit: true, components: [
          {kind: "XV.Groupbox", name: "mainPanel", components: [
            {kind: "onyx.GroupboxHeader", content: "_overview".loc()},
            {kind: "XV.ScrollableGroupbox", name: "mainGroup", fit: true,
              classes: "in-panel", components: [
              {kind: "XV.InputWidget", attr: "number"},
              {kind: "XV.InputWidget", attr: "name"},
              {kind: "XV.ProjectStatusPicker", attr: "status"},
              {kind: "onyx.GroupboxHeader", content: "_schedule".loc()},
              {kind: "XV.DateWidget", attr: "dueDate"},
              {kind: "XV.DateWidget", attr: "startDate"},
              {kind: "XV.DateWidget", attr: "assignDate"},
              {kind: "XV.DateWidget", attr: "completeDate"},
              {kind: "onyx.GroupboxHeader", content: "_hours".loc()},
              {kind: "XV.HoursWidget", attr: "budgetedHours",
               label: "_budgeted".loc()},
              {kind: "XV.HoursWidget", attr: "actualHours",
               label: "_actual".loc()},
              {kind: "onyx.GroupboxHeader", content: "_expenses".loc()},
              {kind: "XV.MoneyWidget", attr: {localValue: "budgetedExpenses"},
               label: "_budgeted".loc(), currencyShowing: false},
              {kind: "XV.MoneyWidget", attr: {localValue: "actualExpenses"},
               label: "_actual".loc(), currencyShowing: false},
              {kind: "onyx.GroupboxHeader", content: "_userAccounts".loc()},
              {kind: "XV.UserAccountWidget", attr: "owner"},
              {kind: "XV.UserAccountWidget", attr: "assignedTo"},
              {kind: "onyx.GroupboxHeader", content: "_notes".loc()},
              {kind: "XV.TextArea", attr: "notes", fit: true}
            ]}
          ]},
          {kind: "XV.TaskCommentBox", attr: "comments"}
        ]}
      ]
    });

    enyo.kind({
      name: "XV.ProjectWorkflowWorkspace",
      kind: "XV.Workspace",
      title: "_projectWorkflow".loc(),
      model: "XM.ProjectWorkflow",
      modelAmnesty: true,
      components: [
        {kind: "Panels", arrangerKind: "CarouselArranger",
          classes: "xv-top-panel", fit: true, components: [
          {kind: "XV.Groupbox", name: "mainPanel", components: [
            {kind: "onyx.GroupboxHeader", content: "_overview".loc()},
            {kind: "XV.ScrollableGroupbox", name: "mainGroup", fit: true,
              classes: "in-panel", components: [
              {kind: "XV.InputWidget", attr: "name"},
              {kind: "XV.InputWidget", attr: "description"},
              {kind: "XV.WorkflowStatusPicker", attr: "status"},
              {kind: "XV.PriorityPicker", attr: "priority", showNone: false},
              {kind: "onyx.GroupboxHeader", content: "_schedule".loc()},
              {kind: "XV.DateWidget", attr: "dueDate"},
              {kind: "XV.DateWidget", attr: "startDate"},
              {kind: "XV.DateWidget", attr: "assignDate"},
              {kind: "XV.DateWidget", attr: "completeDate"},
              {kind: "onyx.GroupboxHeader", content: "_userAccounts".loc()},
              {kind: "XV.UserAccountWidget", attr: "owner"},
              {kind: "XV.UserAccountWidget", attr: "assignedTo"},
              {kind: "onyx.GroupboxHeader", content: "_completionAction".loc()},
              {kind: "XV.ProjectStatusPicker", attr: "parentStatus",
                noneText: "_noChange".loc(), label: "_newProjectStatus".loc()},
              {kind: "onyx.GroupboxHeader", content: "_notes".loc()},
              {kind: "XV.TextArea", attr: "notes", fit: true}
            ]}
          ]}
        ]}
      ]
    });

    // ..........................................................
    // PROJECT TYPE
    //

    enyo.kind({
      name: "XV.ProjectTypeWorkspace",
      kind: "XV.Workspace",
      title: "_projectType".loc(),
      model: "XM.ProjectType",
      components: [
        {kind: "Panels", arrangerKind: "CarouselArranger",
          fit: true, components: [
          {kind: "XV.Groupbox", name: "mainPanel", components: [
            {kind: "onyx.GroupboxHeader", content: "_overview".loc()},
            {kind: "XV.ScrollableGroupbox", name: "mainGroup",
              classes: "in-panel", components: [
              {kind: "XV.InputWidget", attr: "code"},
              {kind: "XV.CheckboxWidget", attr: "isActive"},
              {kind: "XV.InputWidget", attr: "description"}
            ]}
          ]}
        ]}
      ]
    });

    XV.registerModelWorkspace("XM.ProjectType", "XV.ProjectTypeWorkspace");


    // ..........................................................
    // QUOTE
    //
  
    extensions = [
      {kind: "XV.ProjectWidget", container: "settingsGroup", attr: "project"}
    ];

    XV.appendExtension("XV.QuoteWorkspace", extensions);

    // ..........................................................
    // SALES ORDER
    //
  
    extensions = [
      {kind: "XV.ProjectWidget", container: "settingsGroup", attr: "project"}
    ];

    XV.appendExtension("XV.SalesOrderWorkspace", extensions);

    // ..........................................................
    // TASK
    //
  
    extensions = [
      {kind: "XV.TaskCharacteristicsWidget", container: "mainGroup",
        attr: "characteristics"}
    ];

    XV.appendExtension("XV.TaskWorkspace", extensions);

  };

}());
