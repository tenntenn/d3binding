define(
        'd3binding/binding',
        [
                'sb'
        ],
        function(sb) {

            function common(that, name, value, funcname) {
                that.expand(function(selection) {
                    selection[funcname](name, function(d) {
                        var s = d3.select(this);
                        var v = value;
                        if (typeof v === "function") {
                            v = v(d);
                            if (sb.base.observable.isObservable(v)) {
                                var o = v;
                                sb.binding(o)
                                    .onChange(o, function() {
                                        if (that.isTransition) {
                                            if (name !== null) {
                                                (s.transition())[funcname](name, o());
                                            } else {
                                                (s.transition())[funcname](o());
                                            }
                                        } else {
                                            if (name !== null) {
                                                s[funcname](name, o());
                                            } else {
                                                s[funcname](o());
                                            }
                                        }
                                    }).bind();
                                v = o();
                            }
                        }
            
                        return v;
                    });
                });
            
                return that;
            }

           function binding() {
               var that = sb.util.expandable();
               that.isTransition = false;

               that.transition = function() {
                   if (!that.isTransition && that.expand) {
                       var newThat = binding();
                       newThat.funcs = that.funcs;
                       newThat.isTransition = true;
                       return newThat;
                   }
                   return that;
               };

               ['attr', 'style', 'classed'].forEach(function(fn){
                       that[fn] = function(name, value) {
                               return common(that, name, value, fn);
                       };
               });

               ['text', 'html'].forEach(function(fn){
                       that[fn] = function(value) {
                               return common(that, null, value, fn);
                       };
               });

               return that;
           }

           return binding;
   }
);
